import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, GraduationCap } from 'lucide-react';
import { NAV_LINKS, SITE } from '@/lib/constants';
import { NewsletterForm } from '@/components/forms/NewsletterForm';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950">
      <div className="container-wide py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl
                             bg-gradient-to-br from-brand-600 to-brand-400 text-white">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="font-serif text-lg font-semibold">{SITE.name}</span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {SITE.description}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-4">
            Quick links
          </h3>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-4">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-brand-600" />
              <span>At/Post Chochinde, Tal. Mahad, Dist. Raigad, Maharashtra 402301, India</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand-600" />
              <a href="tel:+919527461618" className="hover:text-brand-600">+91 95274 61618</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand-600" />
              <a href="mailto:admissions@modernenglishschool.edu" className="hover:text-brand-600">
                admissions@modernenglishschool.edu
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-4">
            Newsletter
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Monthly highlights, events and announcements — straight to your inbox.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="container-wide py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {year} {SITE.name}. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Facebook" className="hover:text-brand-600"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="Instagram" className="hover:text-brand-600"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Twitter" className="hover:text-brand-600"><Twitter className="h-4 w-4" /></a>
            <a href="#" aria-label="YouTube" className="hover:text-brand-600"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
