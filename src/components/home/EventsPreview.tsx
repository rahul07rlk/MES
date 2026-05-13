import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { EventCard } from '@/components/events/EventCard';
import type { EventItem } from '@/types/database';

export function EventsPreview({ events }: { events: EventItem[] }) {
  if (!events.length) return null;
  return (
    <section className="section">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <SectionHeader
            eyebrow="Events"
            title="What's happening on campus"
            description="Stay updated with upcoming events, competitions and announcements."
            align="left"
          />
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:gap-2 transition-all"
          >
            View all events <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.slice(0, 3).map((e, i) => <EventCard key={e.id} event={e} index={i} />)}
        </div>
      </div>
    </section>
  );
}
