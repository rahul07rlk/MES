'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Users, Award, TrendingUp } from 'lucide-react';
import type { SchoolStats } from '@/types/database';

function useCountUp(target: number, start: boolean, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return value;
}

function StatCard({
  icon: Icon, label, value, suffix, accent, delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string; value: number; suffix: string; accent: string; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const display = useCountUp(value, inView);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="absolute -inset-0.5 rounded-3xl bg-gradient-brand opacity-0 group-hover:opacity-30 blur-xl transition-opacity" />
      <div className="relative glass-strong p-6 lg:p-8 text-center">
        <div className={`mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-glow`}>
          <Icon className="h-6 w-6" />
        </div>
        <p className="font-display text-4xl lg:text-5xl font-bold tracking-tighter-2 gradient-text">
          {display.toLocaleString()}{suffix}
        </p>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-300">{label}</p>
      </div>
    </motion.div>
  );
}

export function Stats({ stats }: { stats: SchoolStats }) {
  const items = [
    { icon: Users,         label: 'Students enrolled',  value: stats.students ?? 2100, suffix: '+', accent: 'from-brand-600 to-brand-500' },
    { icon: GraduationCap, label: 'Faculty members',    value: stats.faculty ?? 165,   suffix: '',  accent: 'from-cyan-500 to-brand-500' },
    { icon: Award,         label: 'Years of excellence', value: stats.years ?? 40,     suffix: '+', accent: 'from-gold-500 to-gold-400' },
    { icon: TrendingUp,    label: 'Board success rate',  value: stats.success_rate ?? 98, suffix: '%', accent: 'from-emerald-500 to-cyan-500' },
  ];

  return (
    <section className="section bg-ink-50 dark:bg-ink-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-60 pointer-events-none" />
      <div className="container-wide relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((s, i) => <StatCard key={s.label} {...s} delay={i * 0.08} />)}
        </div>
      </div>
    </section>
  );
}
