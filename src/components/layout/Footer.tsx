import Link from 'next/link';
import {
  Facebook, Instagram, Twitter, Youtube, Linkedin,
  Mail, Phone, MapPin, GraduationCap, ArrowUpRight,
} from 'lucide-react';
import { NAV_LINKS, SITE } from '@/lib/constants';
import { NewsletterForm } from '@/components/forms/NewsletterForm';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 overflow-hidden bg-ink-950 text-ink-200">
      {/* gradient + grid backdrop */}
      <div className="absolute inset-0 bg-mesh-dark opacity-90 pointer-events-none" />
      <div className="absolute inset-0 bg-dots opacity-25 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-[60%] bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

      <div className="relative container-wide py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-white">
              {SITE.name}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-ink-300">
            {SITE.description}
          </p>

          <div className="mt-5 flex items-center gap-2">
            {[
              { Icon: Facebook,  href: '#', label: 'Facebook' },
              { Icon: Instagram, href: '#', label: 'Instagram' },
              { Icon: Twitter,   href: '#', label: 'X' },
              { Icon: Youtube,   href: '#', label: 'YouTube' },
              { Icon: Linkedin,  href: '#', label: 'LinkedIn' },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full
                           bg-white/5 border border-white/10
                           hover:bg-cyan-500/15 hover:border-cyan-500/40
                           hover:text-cyan-300 transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300 mb-4">
            Quick links
          </h3>
          <ul className="space-y-2.5 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-ink-300 hover:text-white inline-flex items-center gap-1.5 group"
                >
                  {l.label}
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300 mb-4">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-ink-300">
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-cyan-400" />
              <span>At/Post Chochinde, Tal. Mahad,<br />Dist. Raigad, Maharashtra 402301,<br />India</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-cyan-400" />
              <a href="tel:+919527461618" className="hover:text-white">+91 95274 61618</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-cyan-400" />
              <a href="mailto:admissions@modernenglishschool.edu" className="hover:text-white break-all">
                admissions@modernenglishschool.edu
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300 mb-4">
            Stay in the loop
          </h3>
          <p className="text-sm text-ink-300 mb-4 leading-relaxed">
            Monthly highlights, events and announcements — to your inbox.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-wide py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-ink-400">
          <p>© {year} {SITE.name}. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <Link href="/admin/login" className="hover:text-cyan-300">Admin</Link>
            <span className="opacity-30">·</span>
            <span>Designed with care.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
