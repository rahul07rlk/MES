import { createClient } from '@/lib/supabase/server';
import { Inbox, Users, CalendarClock, Megaphone } from 'lucide-react';
import Link from 'next/link';

async function counts() {
  const supabase = await createClient();
  const [a, f, e, n] = await Promise.all([
    supabase.from('admissions').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('faculty').select('id', { count: 'exact', head: true }),
    supabase.from('events').select('id', { count: 'exact', head: true }).eq('is_published', true),
    supabase.from('announcements').select('id', { count: 'exact', head: true }).eq('is_active', true),
  ]);
  return {
    newAdmissions: a.count ?? 0,
    faculty: f.count ?? 0,
    events: e.count ?? 0,
    announcements: n.count ?? 0,
  };
}

export default async function AdminHome() {
  const c = await counts();
  const cards = [
    { icon: Inbox, label: 'New admission inquiries', value: c.newAdmissions, href: '/admin/admissions', accent: 'from-brand-500 to-brand-700' },
    { icon: Users, label: 'Faculty members', value: c.faculty, href: '/admin/faculty', accent: 'from-emerald-500 to-emerald-700' },
    { icon: CalendarClock, label: 'Published events', value: c.events, href: '/admin/events', accent: 'from-amber-500 to-amber-700' },
    { icon: Megaphone, label: 'Active announcements', value: c.announcements, href: '/admin/announcements', accent: 'from-rose-500 to-rose-700' },
  ];

  return (
    <div className="max-w-6xl">
      <h1 className="font-serif text-3xl font-semibold">Welcome back</h1>
      <p className="text-slate-500 mt-1">Snapshot of the school site at a glance.</p>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:shadow-elevated transition-all"
          >
            <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${c.accent} text-white`}>
              <c.icon className="h-5 w-5" />
            </span>
            <p className="mt-3 text-3xl font-serif font-semibold">{c.value}</p>
            <p className="text-sm text-slate-500">{c.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
