import type { Metadata } from 'next';
import Image from 'next/image';
import { Award, Compass, HeartHandshake, Sparkles } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Stats } from '@/components/home/Stats';
import { PrincipalMessage } from '@/components/home/PrincipalMessage';
import { getSchoolInfo } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'About',
  description: 'Our history, vision, mission, and the people who shape Modern Excellence School.',
};

export const revalidate = 600;

export default async function AboutPage() {
  const info = await getSchoolInfo();

  return (
    <>
      <PageHero
        title="About our school"
        subtitle={info?.about_short ?? undefined}
        crumbs={[{ label: 'About' }]}
      />

      {/* History */}
      <section className="section">
        <div className="container-wide grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-elevated">
            <Image
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1600&q=80"
              alt="School history"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Our history</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-serif font-semibold">Four decades of nurturing curious minds</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              {info?.history ??
                'Founded in 1985, our school has grown from a small community classroom into one of the region\'s most respected K–12 institutions.'}
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section bg-slate-50/60 dark:bg-slate-900/40">
        <div className="container-wide grid md:grid-cols-2 gap-6">
          <div className="glass-card p-8">
            <Compass className="h-8 w-8 text-brand-600" />
            <h3 className="mt-4 font-serif text-2xl font-semibold">Vision</h3>
            <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">
              {info?.vision ?? 'To nurture lifelong learners who lead with empathy, think critically, and contribute meaningfully.'}
            </p>
          </div>
          <div className="glass-card p-8">
            <HeartHandshake className="h-8 w-8 text-accent-500" />
            <h3 className="mt-4 font-serif text-2xl font-semibold">Mission</h3>
            <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">
              {info?.mission ?? 'A balanced curriculum that fuses rigor with the arts, athletics, and service.'}
            </p>
          </div>
        </div>
      </section>

      <Stats stats={info?.stats ?? {}} />

      <PrincipalMessage
        name={info?.principal_name}
        message={info?.principal_message}
        image={info?.principal_image_url}
      />

      {/* Achievements */}
      <section className="section">
        <div className="container-wide">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 text-center">Achievements & awards</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-serif font-semibold text-center">Recognised for excellence</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'CBSE Top 10', sub: 'State-wide rankings, 2023' },
              { title: 'International Robotics', sub: 'Gold medal, 2024' },
              { title: 'STEM Excellence', sub: 'National award, 2022' },
              { title: 'Green Campus Award', sub: 'Eco-school, 2025' },
            ].map((a) => (
              <div key={a.title} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
                <Award className="h-7 w-7 text-accent-500" />
                <p className="mt-3 font-semibold">{a.title}</p>
                <p className="text-sm text-slate-500">{a.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-wide max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 text-center">FAQ</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-serif font-semibold text-center">Frequently asked questions</h2>
          <div className="mt-10 space-y-3">
            {[
              { q: 'What curriculum does the school follow?', a: 'We follow the CBSE curriculum from Grades 1–10, with IB Diploma offered in Grades 11–12.' },
              { q: 'What is the student-teacher ratio?', a: 'Roughly 14:1 across the school, with smaller groups in the early years.' },
              { q: 'Do you offer transport?', a: 'Yes, AC buses cover most neighbourhoods within a 20km radius of campus.' },
              { q: 'Are there scholarships available?', a: 'Merit-based scholarships are offered to incoming Grade 9 students who clear the entrance exam with distinction.' },
            ].map((f) => (
              <details key={f.q} className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                <summary className="cursor-pointer font-semibold flex items-center justify-between">
                  {f.q}
                  <Sparkles className="h-4 w-4 text-brand-500 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
