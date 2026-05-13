'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Edit, Plus, Save, Trash2, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { DEPARTMENTS } from '@/lib/constants';
import type { Faculty } from '@/types/database';

const empty: Partial<Faculty> = {
  name: '', designation: '', department: 'Mathematics', qualification: '',
  experience_years: 0, bio: '', email: '', image_url: '', is_active: true, display_order: 0,
};

export function FacultyAdmin({ initial }: { initial: Faculty[] }) {
  const supabase = createClient();
  const [items, setItems] = useState<Faculty[]>(initial);
  const [editing, setEditing] = useState<Partial<Faculty> | null>(null);

  async function save() {
    if (!editing) return;
    if (!editing.name || !editing.designation || !editing.department) {
      toast.error('Name, designation and department are required');
      return;
    }
    if (editing.id) {
      const { data, error } = await supabase.from('faculty').update(editing).eq('id', editing.id).select().single();
      if (error) return toast.error(error.message);
      setItems((xs) => xs.map((x) => x.id === data.id ? data : x));
      toast.success('Updated');
    } else {
      const { data, error } = await supabase.from('faculty').insert(editing).select().single();
      if (error) return toast.error(error.message);
      setItems((xs) => [...xs, data]);
      toast.success('Added');
    }
    setEditing(null);
  }

  async function remove(id: string) {
    if (!confirm('Delete this faculty member? This cannot be undone.')) return;
    const { error } = await supabase.from('faculty').delete().eq('id', id);
    if (error) return toast.error(error.message);
    setItems((xs) => xs.filter((x) => x.id !== id));
    toast.success('Deleted');
  }

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl font-semibold">Faculty</h1>
          <p className="text-slate-500">Add, edit and remove faculty members.</p>
        </div>
        <Button onClick={() => setEditing({ ...empty })}>
          <Plus className="h-4 w-4" /> New faculty
        </Button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Designation</th>
              <th className="p-3">Department</th>
              <th className="p-3">Experience</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {items.map((f) => (
              <tr key={f.id}>
                <td className="p-3 font-medium">{f.name}</td>
                <td className="p-3">{f.designation}</td>
                <td className="p-3">{f.department}</td>
                <td className="p-3">{f.experience_years} yrs</td>
                <td className="p-3 text-right space-x-2">
                  <button onClick={() => setEditing(f)} className="text-brand-600 hover:underline inline-flex items-center gap-1">
                    <Edit className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button onClick={() => remove(f.id)} className="text-red-600 hover:underline inline-flex items-center gap-1">
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-slate-500">No faculty yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl font-semibold">{editing.id ? 'Edit' : 'New'} faculty</h2>
              <button onClick={() => setEditing(null)} className="h-9 w-9 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 inline-flex items-center justify-center">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Name" value={editing.name ?? ''} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              <Input label="Designation" value={editing.designation ?? ''} onChange={(e) => setEditing({ ...editing, designation: e.target.value })} />
              <Select label="Department" value={editing.department ?? ''} onChange={(e) => setEditing({ ...editing, department: e.target.value })}>
                {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </Select>
              <Input label="Qualification" value={editing.qualification ?? ''} onChange={(e) => setEditing({ ...editing, qualification: e.target.value })} />
              <Input label="Experience (years)" type="number" min={0} value={editing.experience_years ?? 0} onChange={(e) => setEditing({ ...editing, experience_years: Number(e.target.value) })} />
              <Input label="Email" type="email" value={editing.email ?? ''} onChange={(e) => setEditing({ ...editing, email: e.target.value })} />
              <div className="sm:col-span-2">
                <Input label="Image URL" value={editing.image_url ?? ''} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <Textarea label="Bio" value={editing.bio ?? ''} onChange={(e) => setEditing({ ...editing, bio: e.target.value })} />
              </div>
              <Input label="Display order" type="number" value={editing.display_order ?? 0} onChange={(e) => setEditing({ ...editing, display_order: Number(e.target.value) })} />
              <label className="flex items-center gap-2 mt-7">
                <input
                  type="checkbox"
                  checked={editing.is_active ?? true}
                  onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })}
                />
                <span className="text-sm">Active (visible on site)</span>
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
