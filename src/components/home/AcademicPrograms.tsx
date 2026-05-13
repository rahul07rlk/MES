'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Baby, BookOpen, GraduationCap, Beaker, Palette, Trophy, ArrowUpRight,
} from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

const programs = [
  { icon: Baby,         title: 'Primary School',  desc: 'Play-based learning, phonics & early numeracy.', accent: 'from-brand-500 to-cyan-500' },
  { icon: BookOpen,     title: 'Middle School',   desc: 'Inquiry-led units that build curiosity.',        accent: 'from-cyan-500 to-brand-600' },
  { icon: GraduationCap,title: 'High School',     desc: 'CBSE rigor with board-prep & university counselling.', accent: 'from-brand-600 to-brand-500' },
  { icon: Beaker,       title: 'STEM Programs',   desc: 'Labs, robotics, AI/ML electives.',               accent: 'from-cyan-500 to-emerald-500' },
  { icon: Palette,      title: 'Arts & Music',    desc: 'Studios for drawing, ceramics, dance and music.', accent: 'from-gold-500 to-gold-400' },
  { icon: Trophy,       title: 'Sports Academy',  desc: 'Twelve sports, four coaches, two grounds.',      accent: 'from-emerald-500 to-cyan-500' },
];

export function AcademicPrograms() {
  return (
    <section className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-50 pointer-events-none" />
      <div className="container-wide relative">
        <SectionHeader
          eyebrow="Academic Programs"
          title="A curriculum built for curious minds"
          description="From the earliest years through graduation — rigorous, integrated, and globally benchmarked."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-brand opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500" />
              <Link
                href="/academics"
                className="relative block rounded-3xl border border-ink-200 dark:border-white/10
                           bg-white dark:bg-ink-900 p-7
                           hover:-translate-y-1 transition-transform duration-500
                           shadow-soft hover:shadow-elevated overflow-hidden"
              >
                {/* corner gradient orb */}
                <div className={`absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${p.accent} opacity-20 blur-2xl group-hover:opacity-50 transition-opacity duration-700`} />

                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${p.accent} text-white shadow-glow`}>
                  <p.icon className="h-5 w-5" />
                </span>

                <h3 className="mt-5 font-display text-xl font-semibold flex items-center gap-2">
                  {p.title}
                  <ArrowUpRight className="h-4 w-4 text-ink-400 group-hover:text-cyan-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>
                <p className="mt-2 text-sm text-ink-500 dark:text-ink-300 leading-relaxed">
                  {p.desc}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
