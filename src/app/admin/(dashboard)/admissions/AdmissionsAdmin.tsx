'use client';

import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Mail, Phone, Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Select } from '@/components/ui/Input';
import type { AdmissionInquiry } from '@/types/database';
import { formatDateTime } from '@/lib/utils';

const STATUSES = ['new', 'contacted', 'enrolled', 'rejected'] as const;
const statusColor: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-amber-100 text-amber-700',
  enrolled: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-slate-100 text-slate-700',
};

export function AdmissionsAdmin({ initial }: { initial: AdmissionInquiry[] }) {
  const supabase = createClient();
  const [items, setItems] = useState(initial);
  const [filter, setFilter] = useState<'all' | typeof STATUSES[number]>('all');

  const filtered = useMemo(
    () => (filter === 'all' ? items : items.filter((i) => i.status === filter)),
    [items, filter]
  );

  async function updateStatus(id: string, status: AdmissionInquiry['status']) {
    const { data, error } = await supabase
      .from('admissions').update({ status }).eq('id', id).select().single();
    if (error) return toast.error(error.message);
    setItems((xs) => xs.map((x) => x.id === data.id ? data : x));
    toast.success('Updated');
  }

  async function remove(id: string) {
    if (!confirm('Delete this inquiry?')) return;
    const { error } = await supabase.from('admissions').delete().eq('id', id);
    if (error) return toast.error(error.message);
    setItems((xs) => xs.filter((x) => x.id !== id));
  }

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl font-semibold">Admission inquiries</h1>
          <p className="text-slate-500">Manage prospective students.</p>
        </div>
        <div className="flex gap-2">
          {['all', ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border capitalize ${
                filter === s ? 'bg-brand-600 text-white border-brand-600' : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((i) => (
          <div key={i.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <div className="min-w-0">
                <p className="font-semibold">{i.student_name} <span className="text-slate-500 font-normal">— {i.grade_applying}</span></p>
                <p className="text-sm text-slate-500">Parent: {i.parent_name}</p>
                <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-500">
                  <a href={`mailto:${i.email}`} className="inline-flex items-center gap-1 hover:text-brand-600"><Mail className="h-3 w-3" /> {i.email}</a>
                  <a href={`tel:${i.phone}`} className="inline-flex items-center gap-1 hover:text-brand-600"><Phone className="h-3 w-3" /> {i.phone}</a>
                  <span>{formatDateTime(i.created_at)}</span>
                </div>
                {i.message && <p className="text-sm mt-2 text-slate-600 dark:text-slate-300">{i.message}</p>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full ${statusColor[i.status]}`}>
                  {i.status}
                </span>
                <Select value={i.status} onChange={(e) => updateStatus(i.id, e.target.value as any)}>
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </Select>
                <button onClick={() => remove(i.id)} className="text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 h-9 w-9 rounded-full inline-flex items-center justify-center">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-center py-12 text-slate-500">No inquiries.</p>}
      </div>
    </div>
  );
}
