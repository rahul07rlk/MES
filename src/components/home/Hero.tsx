'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Sparkles, ChevronDown } from 'lucide-react';
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
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2400&q=85';

  return (
    <section className="relative overflow-hidden min-h-[100svh] flex items-center pt-20">
      {/* Background image with cinematic overlay */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={heroImage || fallback}
          alt="Campus"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink-950/95 via-ink-900/80 to-brand-900/85" />
        <div className="absolute inset-0 bg-mesh-dark opacity-90" />
        <div className="absolute inset-0 bg-dots opacity-30" />
      </div>

      {/* Floating animated blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-brand-600/40 blur-3xl animate-blob"
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-cyan-500/30 blur-3xl animate-blob"
        style={{ animationDelay: '5s' }}
      />
      <motion.div
        aria-hidden
        className="absolute top-1/2 left-1/3 h-72 w-72 rounded-full bg-gold-500/15 blur-3xl animate-blob"
        style={{ animationDelay: '10s' }}
      />

      {/* Sparkle particles */}
      <Particles />

      <div className="relative container-wide grid lg:grid-cols-12 gap-10 items-center text-white">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium
                       bg-white/10 border border-white/20 backdrop-blur-md mb-6"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold-500" />
            <span className="tracking-wide">Admissions open · Academic Year 2026–27</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[1.02] tracking-tighter-2"
          >
            {name.split(' ').map((w, i) => (
              <span key={i} className={i === name.split(' ').length - 1 ? 'gradient-text' : ''}>
                {w}{i < name.split(' ').length - 1 ? ' ' : ''}
              </span>
            ))}
          </motion.h1>

          {tagline && (
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-6 text-lg sm:text-xl text-ink-200/90 max-w-xl leading-relaxed"
            >
              {tagline}
            </motion.p>
          )}

          {motto && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-3 text-xs uppercase tracking-[0.35em] text-gold-500/90 font-semibold"
            >
              {motto}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Button href="/admissions" size="lg" className="bg-gradient-brand shadow-glow text-white border-0">
              Apply Now <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              href="/gallery"
              size="lg"
              className="bg-white/10 hover:bg-white/15 text-white border border-white/25 backdrop-blur"
            >
              Explore Campus <MapPin className="h-4 w-4" />
            </Button>
            <Button
              href="/contact"
              size="lg"
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              Contact Us
            </Button>
          </motion.div>
        </div>

        {/* Floating stats card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="hidden lg:block lg:col-span-5"
        >
          <div className="relative">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-brand opacity-30 blur-2xl" />
            <div className="relative rounded-2xl p-7 text-white
                            bg-white/[0.06] backdrop-blur-2xl
                            border border-white/15 shadow-glass-lg">
              <div className="flex items-center justify-between mb-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
                  At a glance
                </p>
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse-slow" />
              </div>
              <ul className="space-y-4">
                {[
                  { k: '2,100+', v: 'Students enrolled', accent: 'from-cyan-300 to-brand-400' },
                  { k: '165',    v: 'Faculty members',    accent: 'from-brand-400 to-cyan-300' },
                  { k: '40+',    v: 'Years of excellence', accent: 'from-gold-400 to-gold-500' },
                  { k: '98%',    v: 'Board success rate',  accent: 'from-emerald-400 to-cyan-300' },
                ].map((s) => (
                  <li
                    key={s.v}
                    className="flex items-baseline justify-between gap-4 pb-3 border-b border-white/10 last:border-0 last:pb-0"
                  >
                    <span
                      className={`font-display text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${s.accent}`}
                    >
                      {s.k}
                    </span>
                    <span className="text-sm text-white/80">{s.v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center text-white/60"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] mb-2">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="h-9 w-9 rounded-full border border-white/30 inline-flex items-center justify-center"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/** Subtle ambient particles drifting upward */
function Particles() {
  const dots = Array.from({ length: 24 });
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {dots.map((_, i) => {
        const left = (i * 37) % 100;
        const size = 2 + ((i * 13) % 4);
        const delay = (i % 8) * 0.7;
        const duration = 10 + ((i * 7) % 12);
        return (
          <motion.span
            key={i}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '-10%', opacity: [0, 0.7, 0] }}
            transition={{ repeat: Infinity, duration, delay, ease: 'linear' }}
            style={{ left: `${left}%`, width: size, height: size }}
            className="absolute rounded-full bg-cyan-300/60 blur-[1px]"
          />
        );
      })}
    </div>
  );
}
