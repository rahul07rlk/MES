import type { Metadata } from 'next';
import { BookOpen, Beaker, Palette, Calculator, Globe2, Music, Trophy, Cpu, Download, Calendar } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Academics',
  description: 'Explore our curriculum, departments, academic calendar and syllabus.',
};

const departments = [
  { icon: Calculator, name: 'Mathematics', desc: 'From foundational numeracy to AP Calculus and advanced statistics.' },
  { icon: Beaker, name: 'Sciences', desc: 'Physics, Chemistry, Biology and Environmental Sciences with full labs.' },
  { icon: BookOpen, name: 'Languages', desc: 'English, Hindi, Kannada, French and Spanish.' },
  { icon: Globe2, name: 'Social Sciences', desc: 'History, Geography, Economics and Political Science.' },
  { icon: Cpu, name: 'Technology', desc: 'Computer Science, robotics, AI/ML electives in senior school.' },
  { icon: Palette, name: 'Visual Arts', desc: 'Drawing, painting, ceramics and digital design studios.' },
  { icon: Music, name: 'Performing Arts', desc: 'Music, theatre, classical and contemporary dance.' },
  { icon: Trophy, name: 'Physical Education', desc: 'Twelve sports, four full-time coaches, two grounds.' },
];

const stages = [
  { name: 'Early Years (Pre-K – Grade 2)', desc: 'Play-based learning, phonics, early numeracy and motor skills.' },
  { name: 'Primary (Grade 3 – 5)', desc: 'Inquiry-led units across language, math, science and the arts.' },
  { name: 'Middle School (Grade 6 – 8)', desc: 'Specialist teachers, project-based assessments, leadership programmes.' },
  { name: 'Senior School (Grade 9 – 10)', desc: 'CBSE curriculum, board-prep workshops, career guidance.' },
  { name: 'Higher Secondary (Grade 11 – 12)', desc: 'CBSE and IBDP streams with university counselling.' },
];

const calendar = [
  { term: 'Term 1', dates: 'June 3 – Oct 4, 2026' },
  { term: 'Term 2', dates: 'Oct 21, 2026 – Mar 14, 2027' },
  { term: 'Mid-term break', dates: 'Aug 24 – 28, 2026' },
  { term: 'Winter break', dates: 'Dec 22, 2026 – Jan 5, 2027' },
];

export default function AcademicsPage() {
  return (
    <>
      <PageHero
        title="Academics"
        subtitle="A curriculum built on rigor, inquiry, and care — from pre-school to higher secondary."
        crumbs={[{ label: 'Academics' }]}
      />

      <section className="section">
        <div className="container-wide">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Stages of learning</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-serif font-semibold">A continuum from Pre-K to Grade 12</h2>
          <div className="mt-10 relative">
            <div className="absolute left-3 top-1 bottom-1 w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />
            <ol className="space-y-6 md:space-y-8">
              {stages.map((s, i) => (
                <li key={s.name} className="md:pl-10 relative">
                  <span className="hidden md:inline-flex absolute left-0 top-1 h-7 w-7 rounded-full bg-brand-600 text-white items-center justify-center text-xs font-semibold">
                    {i + 1}
                  </span>
                  <p className="font-serif text-xl font-semibold">{s.name}</p>
                  <p className="text-slate-600 dark:text-slate-300">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section bg-slate-50/60 dark:bg-slate-900/40">
        <div className="container-wide">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 text-center">Departments</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-serif font-semibold text-center">Eight departments. One curriculum.</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {departments.map((d) => (
              <div
                key={d.name}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6
                           hover:shadow-elevated hover:-translate-y-0.5 transition-all"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
                  <d.icon className="h-5 w-5" />
                </div>
                <p className="mt-4 font-semibold">{d.name}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide grid lg:grid-cols-2 gap-8">
          <div className="glass-card p-8">
            <Calendar className="h-7 w-7 text-brand-600" />
            <h3 className="mt-3 font-serif text-2xl font-semibold">Academic calendar 2026–27</h3>
            <ul className="mt-5 divide-y divide-slate-200 dark:divide-slate-700">
              {calendar.map((c) => (
                <li key={c.term} className="flex justify-between py-3 text-sm">
                  <span className="font-medium">{c.term}</span>
                  <span className="text-slate-500">{c.dates}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-card p-8">
            <Download className="h-7 w-7 text-accent-500" />
            <h3 className="mt-3 font-serif text-2xl font-semibold">Downloadable syllabus</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Grade-wise syllabus PDFs and reading lists.
            </p>
            <ul className="mt-5 space-y-2">
              {['Grade 5', 'Grade 8', 'Grade 10 (CBSE)', 'Grade 12 (CBSE)', 'Grade 12 (IBDP)'].map((g) => (
                <li key={g}>
                  <a
                    href="#"
                    className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <span>{g} syllabus</span>
                    <Download className="h-4 w-4 text-brand-600" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
