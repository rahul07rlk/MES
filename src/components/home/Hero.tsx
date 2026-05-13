'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SITE } from '@/lib/constants';

type Props = {
  name?: string;
  tagline?: string | null;
  motto?: string | null;
  heroImage?: string | null;
};

export function Hero({ name = SITE.name, tagline, motto, heroImage }: Props) {
  const fallback =
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000&q=80';
  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-center pt-20">
      {/* Background image with overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={heroImage || fallback}
          alt="Campus"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/70 to-brand-900/80" />
        <div className="absolute inset-0 bg-hero-pattern opacity-60" />
      </div>

      {/* Decorative floating blobs */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl"
      />

      <div className="container-wide grid lg:grid-cols-12 gap-10 items-center text-white">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium
                       bg-white/10 border border-white/20 backdrop-blur-md mb-6"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent-500" />
            <span>Admissions open for AY 2026–27</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-7xl font-semibold leading-[1.05] tracking-tight"
          >
            {name}
          </motion.h1>

          {tagline && (
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-5 text-lg sm:text-xl text-slate-100/90 max-w-xl"
            >
              {tagline}
            </motion.p>
          )}

          {motto && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-2 text-sm uppercase tracking-[0.25em] text-accent-500/90 font-medium"
            >
              {motto}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button href="/admissions" variant="accent" size="lg">
              Admissions Open <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              href="/contact"
              size="lg"
              className="bg-white/10 hover:bg-white/15 text-white border border-white/25 backdrop-blur"
            >
              Contact Us
            </Button>
            <Button
              href="/gallery"
              size="lg"
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              Explore Campus <MapPin className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        {/* Quick highlights card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hidden lg:block lg:col-span-5"
        >
          <div className="glass-card p-6 text-slate-900 dark:text-white">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300">
              At a glance
            </p>
            <ul className="mt-4 space-y-3">
              {[
                { k: '2,100+', v: 'Students enrolled' },
                { k: '165', v: 'Faculty members' },
                { k: '40 yrs', v: 'Of academic excellence' },
                { k: '98%', v: 'Board exam success rate' },
              ].map((s) => (
                <li key={s.v} className="flex items-baseline justify-between border-b border-white/10 pb-2 last:border-0">
                  <span className="font-serif text-2xl font-semibold gradient-text">{s.k}</span>
                  <span className="text-sm opacity-80">{s.v}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center text-white/70">
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="mt-1 h-6 w-px bg-white/40"
        />
      </div>
    </section>
  );
}
