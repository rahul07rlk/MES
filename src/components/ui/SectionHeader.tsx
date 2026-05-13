'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div className={cn(align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl', className)}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn('inline-flex', align === 'center' && 'justify-center')}
        >
          <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]
                           bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
            {eyebrow}
          </span>
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="mt-4 font-display text-3xl md:text-5xl font-bold leading-[1.1] tracking-tighter-2"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-base md:text-lg leading-relaxed text-current opacity-70"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
