import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { ContactForm } from '@/components/forms/ContactForm';
import { Mail, MapPin, Phone, Clock, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { getSchoolInfo } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch — phone, email, address, and online inquiry form.',
};

export const revalidate = 600;

export default async function ContactPage() {
  const info = await getSchoolInfo();

  return (
    <>
      <PageHero
        title="Contact us"
        subtitle="We'd love to hear from you. Reach out by email, phone or use the form below."
        crumbs={[{ label: 'Contact' }]}
      />

      <section className="section">
        <div className="container-wide grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <ContactCard icon={MapPin} title="Visit us" lines={[info?.address ?? 'At/Post Chochinde, Tal. Mahad, Dist. Raigad, Maharashtra 402301, India']} />
            <ContactCard icon={Phone} title="Call us" lines={[info?.phone ?? '+91 95274 61618']} />
            <ContactCard icon={Mail} title="Email us" lines={[info?.email ?? 'admissions@modernenglishschool.edu']} />
            <ContactCard icon={Clock} title="Office hours" lines={['Mon – Fri  8:00 AM – 4:30 PM', 'Sat  9:00 AM – 12:30 PM']} />

            <div className="glass-card p-6">
              <p className="text-sm font-semibold mb-3">Follow us</p>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: info?.facebook_url ?? '#' },
                  { icon: Instagram, href: info?.instagram_url ?? '#' },
                  { icon: Twitter, href: info?.twitter_url ?? '#' },
                  { icon: Youtube, href: info?.youtube_url ?? '#' },
                ].map(({ icon: Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8">
            <h2 className="font-serif text-2xl font-semibold">Send us a message</h2>
            <p className="text-sm text-slate-500 mt-1">We aim to respond within one business day.</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-wide">
          <div className="aspect-[16/7] w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-soft">
            <iframe
              title="Map"
              src={
                info?.google_maps_embed ??
                'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124426.61348103027!2d77.4661!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16!2sBengaluru!5e0!3m2!1sen!2sin!4v1700000000000'
              }
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  icon: Icon, title, lines,
}: { icon: React.ComponentType<{ className?: string }>; title: string; lines: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex gap-4">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300 shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        {lines.map((l) => (
          <p key={l} className="text-sm text-slate-600 dark:text-slate-400">{l}</p>
        ))}
      </div>
    </div>
  );
}
