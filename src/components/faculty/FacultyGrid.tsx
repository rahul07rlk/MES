'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { FacultyCard } from './FacultyCard';
import type { Faculty } from '@/types/database';

export function FacultyGrid({ faculty }: { faculty: Faculty[] }) {
  const [q, setQ] = useState('');
  const [dept, setDept] = useState<string>('All');

  const departments = useMemo(
    () => ['All', ...Array.from(new Set(faculty.map((f) => f.department)))],
    [faculty]
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return faculty.filter((f) => {
      const matchesQ = !needle
        || f.name.toLowerCase().includes(needle)
        || f.designation.toLowerCase().includes(needle)
        || (f.qualification ?? '').toLowerCase().includes(needle);
      const matchesDept = dept === 'All' || f.department === dept;
      return matchesQ && matchesDept;
    });
  }, [faculty, q, dept]);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-3 mb-10">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, designation, qualification…"
            className="w-full rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900
                       pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {departments.map((d) => (
            <button
              key={d}
              onClick={() => setDept(d)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                dept === d
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center py-12 text-slate-500">No faculty match your search.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((f, i) => <FacultyCard key={f.id} f={f} index={i} />)}
        </div>
      )}
    </div>
  );
}
