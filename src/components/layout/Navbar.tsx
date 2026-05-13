'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, GraduationCap } from 'lucide-react';
import { NAV_LINKS, SITE } from '@/lib/constants';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Hide site nav inside the admin area
  if (pathname.startsWith('/admin')) return null;

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60'
          : 'bg-transparent'
      )}
    >
      <nav className="container-wide flex h-16 md:h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl
                           bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-soft
                           group-hover:scale-105 transition-transform">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="font-serif text-lg md:text-xl font-semibold tracking-tight">
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
                    'relative px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    active
                      ? 'text-brand-600 dark:text-brand-300'
                      : 'text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-300'
                  )}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-500"
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
            className="hidden md:inline-flex items-center rounded-full
                       bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold
                       px-4 py-2 shadow-soft transition-colors"
          >
            Apply Now
          </Link>
          <ThemeToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full
                       border border-slate-200 dark:border-slate-800"
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
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-950"
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
                        ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-200'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
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
                  className="block rounded-lg px-3 py-2.5 mt-2 text-sm font-semibold
                             bg-brand-600 text-white text-center"
                >
                  Apply Now
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
