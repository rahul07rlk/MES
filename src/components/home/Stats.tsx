'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Users, Award, TrendingUp } from 'lucide-react';
import type { SchoolStats } from '@/types/database';

export function Stats({ stats }: { stats: SchoolStats }) {
  const items = [
    { icon: Users, label: 'Students', value: stats.students ?? 2100, suffix: '+' },
    { icon: GraduationCap, label: 'Faculty', value: stats.faculty ?? 165, suffix: '' },
    { icon: Award, label: 'Years of excellence', value: stats.years ?? 40, suffix: '+' },
    { icon: TrendingUp, label: 'Board success rate', value: stats.success_rate ?? 98, suffix: '%' },
  ];

  return (
    <section className="section">
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-6 text-center"
            >
              <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl
                              bg-gradient-to-br from-brand-100 to-brand-50 text-brand-700
                              dark:from-brand-500/20 dark:to-brand-500/5 dark:text-brand-300">
                <s.icon className="h-6 w-6" />
              </div>
              <p className="font-serif text-4xl md:text-5xl font-semibold gradient-text">
                {s.value}{s.suffix}
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
