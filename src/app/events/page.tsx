import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { EventCard } from '@/components/events/EventCard';
import { getAllEvents, getAnnouncements } from '@/lib/queries';
import { Megaphone } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Events & Announcements',
  description: 'Upcoming events, recent announcements and news.',
};

export const revalidate = 120;

export default async function EventsPage() {
  const [events, announcements] = await Promise.all([getAllEvents(), getAnnouncements()]);
  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.start_at) >= now);
  const past = events.filter((e) => new Date(e.start_at) < now);

  return (
    <>
      <PageHero
        title="Events & announcements"
        subtitle="Stay up to date with everything happening on campus."
        crumbs={[{ label: 'Events' }]}
      />

      {announcements.length > 0 && (
        <section className="section pt-0">
          <div className="container-wide">
            <h2 className="font-serif text-2xl font-semibold flex items-center gap-2 mb-6">
              <Megaphone className="h-5 w-5 text-brand-600" /> Announcements
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {announcements.map((a) => (
                <div
                  key={a.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-block h-2 w-2 rounded-full ${
                      a.priority >= 2 ? 'bg-red-500' : a.priority === 1 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`} />
                    <span className="text-xs uppercase tracking-wider text-slate-500">
                      {formatDate(a.published_at)}
                    </span>
                  </div>
                  <p className="font-semibold">{a.title}</p>
                  {a.body && <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{a.body}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section pt-0">
        <div className="container-wide">
          <h2 className="font-serif text-2xl font-semibold mb-6">Upcoming events</h2>
          {upcoming.length === 0 ? (
            <p className="text-slate-500">No upcoming events scheduled. Please check back soon.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((e, i) => <EventCard key={e.id} event={e} index={i} />)}
            </div>
          )}
        </div>
      </section>

      {past.length > 0 && (
        <section className="section pt-0">
          <div className="container-wide">
            <h2 className="font-serif text-2xl font-semibold mb-6">Past events</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 opacity-80">
              {past.map((e, i) => <EventCard key={e.id} event={e} index={i} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
