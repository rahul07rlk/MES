'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';

const pillars = [
  'Inquiry-based curriculum aligned with global standards',
  'Faculty mentorship and small-group learning',
  'STEAM labs, performing arts and athletics under one roof',
  'A culture rooted in integrity and respect',
];

export function AboutPreview({ aboutShort }: { aboutShort?: string | null }) {
  return (
    <section className="section">
      <div className="container-wide grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative aspect-[5/4] rounded-3xl overflow-hidden shadow-elevated"
        >
          <Image
            src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1400&q=80"
            alt="Students in classroom"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute bottom-4 left-4 right-4 glass-card p-4 text-sm">
            <p className="font-serif text-base font-semibold">Est. 2026</p>
            <p className="text-slate-600 dark:text-slate-300">
              A new beginning — a school built for the next generation of learners.
            </p>
          </div>
        </motion.div>

        <div>
          <SectionHeader
            eyebrow="About the school"
            title="An education that prepares students for life — not just exams"
            description={aboutShort ?? undefined}
            align="left"
          />
          <ul className="mt-6 space-y-3">
            {pillars.map((p) => (
              <li key={p} className="flex gap-3 text-sm md:text-base text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-600" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex gap-3">
            <Button href="/about">Learn more</Button>
            <Button href="/academics" variant="outline">Our academics</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
