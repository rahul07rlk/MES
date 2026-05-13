'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Edit, Plus, Save, Trash2, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';
import type { EventItem } from '@/types/database';
import { formatDate } from '@/lib/utils';

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').slice(0, 80);
}

const empty: Partial<EventItem> = {
  title: '', slug: '', description: '', location: '', category: 'general',
  start_at: new Date().toISOString().slice(0, 16), end_at: null, cover_image_url: '',
  is_featured: false, is_published: true,
};

export function EventsAdmin({ initial }: { initial: EventItem[] }) {
  const supabase = createClient();
  const [items, setItems] = useState<EventItem[]>(initial);
  const [editing, setEditing] = useState<Partial<EventItem> | null>(null);

  async function save() {
    if (!editing) return;
    const payload: Partial<EventItem> = {
      ...editing,
      slug: editing.slug || slugify(editing.title ?? ''),
      start_at: editing.start_at ? new Date(editing.start_at).toISOString() : null!,
      end_at: editing.end_at ? new Date(editing.end_at).toISOString() : null,
    };
    if (!payload.title || !payload.start_at) {
      toast.error('Title and start date are required');
      return;
    }
    if (editing.id) {
      const { data, error } = await supabase.from('events').update(payload).eq('id', editing.id).select().single();
      if (error) return toast.error(error.message);
      setItems((xs) => xs.map((x) => x.id === data.id ? data : x));
      toast.success('Updated');
    } else {
      const { data, error } = await supabase.from('events').insert(payload).select().single();
      if (error) return toast.error(error.message);
      setItems((xs) => [data, ...xs]);
      toast.success('Created');
    }
    setEditing(null);
  }

  async function remove(id: string) {
    if (!confirm('Delete this event?')) return;
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) return toast.error(error.message);
    setItems((xs) => xs.filter((x) => x.id !== id));
    toast.success('Deleted');
  }

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl font-semibold">Events</h1>
          <p className="text-slate-500">Manage upcoming and past events.</p>
        </div>
        <Button onClick={() => setEditing({ ...empty })}>
          <Plus className="h-4 w-4" /> New event
        </Button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Start</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {items.map((e) => (
              <tr key={e.id}>
                <td className="p-3 font-medium">{e.title}{e.is_featured && <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-accent-500 text-white">FEATURED</span>}</td>
                <td className="p-3 capitalize">{e.category}</td>
                <td className="p-3">{formatDate(e.start_at)}</td>
                <td className="p-3">{e.is_published ? <span className="text-emerald-600">Published</span> : <span className="text-slate-500">Draft</span>}</td>
                <td className="p-3 text-right space-x-2">
                  <button onClick={() => setEditing({ ...e, start_at: e.start_at?.slice(0, 16), end_at: e.end_at?.slice(0, 16) ?? null } as any)} className="text-brand-600 hover:underline inline-flex items-center gap-1">
                    <Edit className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button onClick={() => remove(e.id)} className="text-red-600 hover:underline inline-flex items-center gap-1">
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-slate-500">No events yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl font-semibold">{editing.id ? 'Edit' : 'New'} event</h2>
              <button onClick={() => setEditing(null)} className="h-9 w-9 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 inline-flex items-center justify-center">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Input label="Title" value={editing.title ?? ''} onChange={(ev) => setEditing({ ...editing, title: ev.target.value, slug: editing.slug || slugify(ev.target.value) })} />
              </div>
              <Input label="Slug" value={editing.slug ?? ''} onChange={(ev) => setEditing({ ...editing, slug: ev.target.value })} />
              <Select label="Category" value={editing.category ?? 'general'} onChange={(ev) => setEditing({ ...editing, category: ev.target.value })}>
                {['general', 'academic', 'sports', 'cultural', 'parents'].map((c) => <option key={c} value={c}>{c}</option>)}
              </Select>
              <Input label="Starts at" type="datetime-local" value={(editing.start_at as string) ?? ''} onChange={(ev) => setEditing({ ...editing, start_at: ev.target.value })} />
              <Input label="Ends at (optional)" type="datetime-local" value={(editing.end_at as string) ?? ''} onChange={(ev) => setEditing({ ...editing, end_at: ev.target.value || null })} />
              <div className="sm:col-span-2">
                <Input label="Location" value={editing.location ?? ''} onChange={(ev) => setEditing({ ...editing, location: ev.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <Input label="Cover image URL" value={editing.cover_image_url ?? ''} onChange={(ev) => setEditing({ ...editing, cover_image_url: ev.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <Textarea label="Description" value={editing.description ?? ''} onChange={(ev) => setEditing({ ...editing, description: ev.target.value })} />
              </div>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={editing.is_featured ?? false} onChange={(ev) => setEditing({ ...editing, is_featured: ev.target.checked })} />
                <span className="text-sm">Featured</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={editing.is_published ?? true} onChange={(ev) => setEditing({ ...editing, is_published: ev.target.checked })} />
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
