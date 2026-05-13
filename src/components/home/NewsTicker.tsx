import { Megaphone } from 'lucide-react';
import type { Announcement } from '@/types/database';

export function NewsTicker({ items }: { items: Announcement[] }) {
  if (!items.length) return null;
  // duplicate the items so the marquee loops cleanly
  const loop = [...items, ...items];
  return (
    <div className="border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
      <div className="container-wide flex items-center gap-4 py-2">
        <span className="inline-flex items-center gap-1.5 shrink-0 rounded-full bg-brand-600 text-white text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1">
          <Megaphone className="h-3.5 w-3.5" /> News
        </span>
        <div className="relative overflow-hidden flex-1">
          <div className="flex gap-10 whitespace-nowrap animate-marquee">
            {loop.map((a, i) => (
              <span key={`${a.id}-${i}`} className="text-sm text-slate-700 dark:text-slate-300">
                {a.priority >= 2 && <span className="text-red-500 mr-1">●</span>}
                <span className="font-medium">{a.title}</span>
                {a.body && <span className="text-slate-500"> — {a.body}</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
