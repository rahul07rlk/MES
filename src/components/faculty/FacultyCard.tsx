'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import type { Faculty } from '@/types/database';
import { getInitials } from '@/lib/utils';

export function FacultyCard({ f, index = 0 }: { f: Faculty; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.04, 0.4) }}
      className="group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800
                 bg-white dark:bg-slate-900 hover:shadow-elevated transition-all"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-brand-100 to-brand-50 dark:from-brand-500/20 dark:to-brand-500/5">
        {f.image_url ? (
          <Image
            src={f.image_url}
            alt={f.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center font-serif text-4xl text-brand-700">
            {getInitials(f.name)}
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="font-serif text-lg font-semibold leading-tight">{f.name}</p>
        <p className="text-sm text-brand-600 dark:text-brand-300">{f.designation}</p>
        <div className="mt-3 space-y-1 text-xs text-slate-500">
          {f.qualification && <p>{f.qualification}</p>}
          {f.experience_years > 0 && <p>{f.experience_years}+ years experience</p>}
          <p className="uppercase tracking-wider font-semibold text-slate-400">{f.department}</p>
        </div>
        {f.email && (
          <a
            href={`mailto:${f.email}`}
            className="mt-4 inline-flex items-center gap-1.5 text-xs text-brand-600 hover:text-brand-700"
          >
            <Mail className="h-3.5 w-3.5" /> {f.email}
          </a>
        )}
      </div>
    </motion.article>
  );
}
