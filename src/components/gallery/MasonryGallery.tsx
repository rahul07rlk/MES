'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { GalleryItem } from '@/types/database';

const CATEGORIES = ['All', 'campus', 'events', 'activities', 'sports'] as const;
type Cat = typeof CATEGORIES[number];

export function MasonryGallery({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<Cat>('All');
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const filtered = useMemo(
    () => (active === 'All' ? items : items.filter((i) => i.category === active)),
    [items, active]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border capitalize transition-colors ${
              active === c
                ? 'bg-brand-600 text-white border-brand-600'
                : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
        {filtered.map((g, i) => (
          <motion.button
            key={g.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            onClick={() => setOpenIdx(i)}
            className="group block w-full mb-4 break-inside-avoid overflow-hidden rounded-2xl
                       border border-slate-200 dark:border-slate-800 cursor-zoom-in"
          >
            <div className="relative">
              <Image
                src={g.image_url}
                alt={g.title ?? 'Gallery image'}
                width={g.width ?? 800}
                height={g.height ?? 600}
                sizes="(max-width: 640px) 100vw, 25vw"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {(g.title || g.caption) && (
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  {g.title && <p className="text-sm font-semibold">{g.title}</p>}
                  {g.caption && <p className="text-xs opacity-80">{g.caption}</p>}
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {openIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIdx(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <button
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 text-white inline-flex items-center justify-center hover:bg-white/20"
              onClick={() => setOpenIdx(null)}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[openIdx].image_url}
                alt={filtered[openIdx].title ?? 'Gallery image'}
                fill
                sizes="100vw"
                className="object-contain rounded-xl"
              />
              {(filtered[openIdx].title || filtered[openIdx].caption) && (
                <div className="absolute inset-x-0 bottom-0 p-4 text-white text-center">
                  {filtered[openIdx].title && <p className="font-semibold">{filtered[openIdx].title}</p>}
                  {filtered[openIdx].caption && <p className="text-sm opacity-80">{filtered[openIdx].caption}</p>}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
