'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Edit, Plus, Save, Trash2, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';
import type { Announcement } from '@/types/database';
import { formatDate } from '@/lib/utils';

const empty: Partial<Announcement> = {
  title: '', body: '', link_url: '', priority: 0, is_active: true,
  expires_at: null,
};

export function AnnouncementsAdmin({ initial }: { initial: Announcement[] }) {
  const supabase = createClient();
  const [items, setItems] = useState(initial);
  const [editing, setEditing] = useState<Partial<Announcement> | null>(null);

  async function save() {
    if (!editing?.title) return toast.error('Title is required');
    const payload: Partial<Announcement> = {
      ...editing,
      expires_at: editing.expires_at ? new Date(editing.expires_at).toISOString() : null,
    };
    if (editing.id) {
      const { data, error } = await supabase.from('announcements').update(payload).eq('id', editing.id).select().single();
      if (error) return toast.error(error.message);
      setItems((xs) => xs.map((x) => x.id === data.id ? data : x));
    } else {
      const { data, error } = await supabase.from('announcements').insert(payload).select().single();
      if (error) return toast.error(error.message);
      setItems((xs) => [data, ...xs]);
    }
    toast.success('Saved');
    setEditing(null);
  }

  async function remove(id: string) {
    if (!confirm('Delete announcement?')) return;
    const { error } = await supabase.from('announcements').delete().eq('id', id);
    if (error) return toast.error(error.message);
    setItems((xs) => xs.filter((x) => x.id !== id));
  }

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl font-semibold">Announcements</h1>
          <p className="text-slate-500">Notices that appear in the news ticker.</p>
        </div>
        <Button onClick={() => setEditing({ ...empty })}>
          <Plus className="h-4 w-4" /> New
        </Button>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-800">
        {items.map((a) => (
          <div key={a.id} className="p-4 flex items-start gap-4">
            <span className={`mt-1 inline-block h-2 w-2 rounded-full ${
              a.priority >= 2 ? 'bg-red-500' : a.priority === 1 ? 'bg-amber-500' : 'bg-emerald-500'
            }`} />
            <div className="flex-1 min-w-0">
              <p className="font-medium">{a.title}</p>
              {a.body && <p className="text-sm text-slate-600 dark:text-slate-400">{a.body}</p>}
              <p className="text-xs text-slate-500 mt-1">
                {formatDate(a.published_at)} {!a.is_active && '· inactive'}
              </p>
            </div>
            <div className="shrink-0 space-x-2 text-sm">
              <button onClick={() => setEditing({ ...a, expires_at: a.expires_at?.slice(0, 16) ?? null } as any)} className="text-brand-600 hover:underline inline-flex items-center gap-1">
                <Edit className="h-3.5 w-3.5" /> Edit
              </button>
              <button onClick={() => remove(a.id)} className="text-red-600 hover:underline inline-flex items-center gap-1">
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="p-8 text-center text-slate-500">No announcements.</p>}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl font-semibold">{editing.id ? 'Edit' : 'New'} announcement</h2>
              <button onClick={() => setEditing(null)} className="h-9 w-9 rounded-full hover:bg-slate-100 inline-flex items-center justify-center">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4">
              <Input label="Title" value={editing.title ?? ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              <Textarea label="Body" value={editing.body ?? ''} onChange={(e) => setEditing({ ...editing, body: e.target.value })} />
              <Input label="Link URL (optional)" value={editing.link_url ?? ''} onChange={(e) => setEditing({ ...editing, link_url: e.target.value })} />
              <Select label="Priority" value={String(editing.priority ?? 0)} onChange={(e) => setEditing({ ...editing, priority: Number(e.target.value) })}>
                <option value={0}>Normal</option>
                <option value={1}>Important</option>
                <option value={2}>Urgent</option>
              </Select>
              <Input label="Expires at (optional)" type="datetime-local" value={(editing.expires_at as string) ?? ''} onChange={(e) => setEditing({ ...editing, expires_at: e.target.value || null })} />
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={editing.is_active ?? true} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} />
                <span className="text-sm">Active</span>
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
