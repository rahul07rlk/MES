'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Edit, Plus, Save, Trash2, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import type { Testimonial } from '@/types/database';

const empty: Partial<Testimonial> = {
  author_name: '', author_role: '', content: '', rating: 5, is_published: true,
  author_image_url: '', display_order: 0,
};

export function TestimonialsAdmin({ initial }: { initial: Testimonial[] }) {
  const supabase = createClient();
  const [items, setItems] = useState(initial);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);

  async function save() {
    if (!editing?.author_name || !editing.content) {
      return toast.error('Author and content are required');
    }
    if (editing.id) {
      const { data, error } = await supabase.from('testimonials').update(editing).eq('id', editing.id).select().single();
      if (error) return toast.error(error.message);
      setItems((xs) => xs.map((x) => x.id === data.id ? data : x));
    } else {
      const { data, error } = await supabase.from('testimonials').insert(editing).select().single();
      if (error) return toast.error(error.message);
      setItems((xs) => [...xs, data]);
    }
    toast.success('Saved');
    setEditing(null);
  }

  async function remove(id: string) {
    if (!confirm('Delete testimonial?')) return;
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) return toast.error(error.message);
    setItems((xs) => xs.filter((x) => x.id !== id));
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl font-semibold">Testimonials</h1>
          <p className="text-slate-500">Quotes that appear on the homepage carousel.</p>
        </div>
        <Button onClick={() => setEditing({ ...empty })}>
          <Plus className="h-4 w-4" /> New
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((t) => (
          <div key={t.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
            <p className="text-sm">“{t.content}”</p>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-xs text-slate-500">— {t.author_name}{t.author_role && `, ${t.author_role}`}{!t.is_published && ' · unpublished'}</p>
              <div className="space-x-2 text-sm">
                <button onClick={() => setEditing(t)} className="text-brand-600 hover:underline inline-flex items-center gap-1"><Edit className="h-3.5 w-3.5" /> Edit</button>
                <button onClick={() => remove(t.id)} className="text-red-600 hover:underline inline-flex items-center gap-1"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-center py-12 text-slate-500">No testimonials yet.</p>}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl font-semibold">{editing.id ? 'Edit' : 'New'} testimonial</h2>
              <button onClick={() => setEditing(null)} className="h-9 w-9 rounded-full hover:bg-slate-100 inline-flex items-center justify-center">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4">
              <Input label="Author name" value={editing.author_name ?? ''} onChange={(e) => setEditing({ ...editing, author_name: e.target.value })} />
              <Input label="Role" value={editing.author_role ?? ''} onChange={(e) => setEditing({ ...editing, author_role: e.target.value })} />
              <Input label="Author image URL" value={editing.author_image_url ?? ''} onChange={(e) => setEditing({ ...editing, author_image_url: e.target.value })} />
              <Textarea label="Content" value={editing.content ?? ''} onChange={(e) => setEditing({ ...editing, content: e.target.value })} />
              <Input label="Rating (1–5)" type="number" min={1} max={5} value={editing.rating ?? 5} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })} />
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={editing.is_published ?? true} onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })} />
                <span className="text-sm">Published</span>
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
              <Button onClick={save}><Save className="h-4 w-4" /> Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
