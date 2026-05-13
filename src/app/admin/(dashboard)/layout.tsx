import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  Users, CalendarClock, Megaphone, ImageIcon, Inbox, LayoutDashboard, MessageSquareQuote,
  Settings, GraduationCap,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { SignOutButton } from '../SignOutButton';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

const items = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/faculty', label: 'Faculty', icon: Users },
  { href: '/admin/events', label: 'Events', icon: CalendarClock },
  { href: '/admin/announcements', label: 'Announcements', icon: Megaphone },
  { href: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
  { href: '/admin/admissions', label: 'Admissions', icon: Inbox },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { href: '/admin/settings', label: 'School info', icon: Settings },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const { data: admin } = await supabase
    .from('admins').select('user_id').eq('user_id', user.id).maybeSingle();
  const isAdmin = !!admin;

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <Link href="/admin" className="flex items-center gap-2 h-16 px-5 border-b border-slate-200 dark:border-slate-800">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 text-white">
            <GraduationCap className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold">Admin</p>
            <p className="text-[11px] text-slate-500 truncate max-w-[160px]">{user.email}</p>
          </div>
        </Link>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <it.icon className="h-4 w-4" />
              {it.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-slate-200 dark:border-slate-800">
          <SignOutButton />
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {!isAdmin && (
          <div className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/30 text-amber-900 dark:text-amber-200 text-sm px-6 py-2">
            You are signed in but not yet listed in <code className="font-mono">admins</code>. Insert your <code>user_id</code> there to enable write access.
          </div>
        )}
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
