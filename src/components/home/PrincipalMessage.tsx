'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export function PrincipalMessage({
  name, message, image,
}: { name?: string | null; message?: string | null; image?: string | null }) {
  if (!message) return null;
  return (
    <section className="section">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 grid md:grid-cols-3 gap-8 items-center"
        >
          <div className="relative aspect-square rounded-2xl overflow-hidden md:col-span-1">
            <Image
              src={image || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600'}
              alt={name ?? 'Principal'}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="md:col-span-2">
            <Quote className="h-10 w-10 text-brand-500/40 mb-3" />
            <p className="font-serif text-xl md:text-2xl leading-relaxed text-slate-800 dark:text-slate-200">
              {message}
            </p>
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <p className="font-semibold">{name}</p>
              <p className="text-sm text-slate-500">Principal</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
