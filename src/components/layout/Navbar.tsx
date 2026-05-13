'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, GraduationCap, ArrowRight } from 'lucide-react';
import { NAV_LINKS, SITE } from '@/lib/constants';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (pathname.startsWith('/admin')) return null;

  // Only the home page has a permanently dark hero behind the navbar.
  // Every other page starts on a light backdrop, so we need dark text from the top.
  const isHome = pathname === '/';
  const overDark = isHome && !scrolled;

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        overDark
          ? 'bg-gradient-to-b from-ink-950/40 to-transparent'
          : 'bg-white/75 dark:bg-ink-950/75 backdrop-blur-2xl backdrop-saturate-150 border-b border-ink-200/50 dark:border-white/10 shadow-soft'
      )}
    >
      <nav className="container-wide flex h-16 md:h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-2xl
                           bg-gradient-brand text-white shadow-glow
                           group-hover:scale-105 transition-transform duration-300">
            <GraduationCap className="h-5 w-5" />
            <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20" />
          </span>
          <span className={cn(
            'font-display text-base md:text-lg font-bold tracking-tight transition-colors',
            overDark ? 'text-white' : 'text-ink-900 dark:text-white'
          )}>
            {SITE.name}
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    'relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors',
                    active
                      ? overDark ? 'text-cyan-300' : 'text-brand-600 dark:text-cyan-300'
                      : overDark
                        ? 'text-white/85 hover:text-white'
                        : 'text-ink-700 dark:text-ink-200 hover:text-brand-600 dark:hover:text-cyan-300'
                  )}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-1 h-[2px] rounded-full bg-gradient-to-r from-brand-500 to-cyan-500"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/admissions"
            className="hidden md:inline-flex items-center gap-1.5 rounded-full
                       bg-gradient-brand text-white text-sm font-semibold
                       px-5 py-2.5 shadow-glow
                       hover:-translate-y-0.5 transition-all duration-300"
          >
            Apply Now <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <ThemeToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            className={cn(
              'lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors',
              overDark
                ? 'border-white/20 text-white'
                : 'border-ink-200 dark:border-white/10 text-ink-900 dark:text-white'
            )}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="lg:hidden overflow-hidden bg-white/95 dark:bg-ink-950/95 backdrop-blur-2xl border-t border-ink-200 dark:border-white/10"
          >
            <ul className="container-wide py-4 grid gap-1">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block rounded-lg px-3 py-2.5 text-sm font-medium',
                      pathname === l.href
                        ? 'bg-brand-50 text-brand-700 dark:bg-cyan-500/10 dark:text-cyan-300'
                        : 'text-ink-700 dark:text-ink-200 hover:bg-ink-100 dark:hover:bg-white/5'
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/admissions"
                  onClick={() => setOpen(false)}
                  className="mt-2 block rounded-full px-3 py-3 text-sm font-semibold text-center
                             bg-gradient-brand text-white shadow-glow"
                >
                  Apply Now →
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
