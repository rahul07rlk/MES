'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { Testimonial } from '@/types/database';
import { getInitials } from '@/lib/utils';

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(() => setI((p) => (p + 1) % items.length), 6000);
    return () => clearInterval(id);
  }, [items.length]);

  if (!items.length) return null;
  const t = items[i];

  return (
    <section className="section bg-slate-50/60 dark:bg-slate-900/30">
      <div className="container-wide">
        <SectionHeader
          eyebrow="What our community says"
          title="Voices from parents, students and alumni"
        />
        <div className="mt-12 max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-8 md:p-12 text-center"
            >
              <div className="flex justify-center gap-0.5 mb-5">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-accent-500 text-accent-500" />
                ))}
              </div>
              <p className="font-serif text-xl md:text-2xl leading-relaxed text-slate-800 dark:text-slate-200">
                “{t.content}”
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <div className="relative h-12 w-12 rounded-full overflow-hidden bg-brand-100 text-brand-700 flex items-center justify-center font-semibold">
                  {t.author_image_url ? (
                    <Image src={t.author_image_url} alt={t.author_name} fill sizes="48px" className="object-cover" />
                  ) : (
                    getInitials(t.author_name)
                  )}
                </div>
                <div className="text-left">
                  <p className="font-semibold">{t.author_name}</p>
                  {t.author_role && <p className="text-xs text-slate-500">{t.author_role}</p>}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {items.length > 1 && (
            <>
              <button
                onClick={() => setI((p) => (p - 1 + items.length) % items.length)}
                className="absolute top-1/2 -left-2 md:-left-12 -translate-y-1/2 h-10 w-10 rounded-full
                           glass-card flex items-center justify-center hover:bg-white/90"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setI((p) => (p + 1) % items.length)}
                className="absolute top-1/2 -right-2 md:-right-12 -translate-y-1/2 h-10 w-10 rounded-full
                           glass-card flex items-center justify-center hover:bg-white/90"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="mt-6 flex justify-center gap-2">
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setI(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === i ? 'w-8 bg-brand-600' : 'w-2 bg-slate-300 dark:bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
