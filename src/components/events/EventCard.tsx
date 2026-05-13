'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { EventItem } from '@/types/database';

export function EventCard({ event, index = 0 }: { event: EventItem; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800
                 bg-white dark:bg-slate-900 hover:shadow-elevated transition-all"
    >
      <Link href={`/events#${event.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          {event.cover_image_url ? (
            <Image
              src={event.cover_image_url}
              alt={event.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-brand-700" />
          )}
          {event.is_featured && (
            <span className="absolute top-3 left-3 rounded-full bg-accent-500 text-white text-[10px] uppercase tracking-wider px-2 py-1">
              Featured
            </span>
          )}
          <span className="absolute top-3 right-3 rounded-full bg-white/85 text-slate-800 text-[10px] uppercase tracking-wider px-2 py-1">
            {event.category}
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-serif text-lg font-semibold leading-tight group-hover:text-brand-600 transition-colors">
            {event.title}
          </h3>
          {event.description && (
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
              {event.description}
            </p>
          )}
          <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {formatDate(event.start_at)}</span>
            {event.location && (
              <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {event.location}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
