import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { AdmissionForm } from '@/components/forms/AdmissionForm';
import { CheckCircle2, FileText, Phone, ClipboardCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admissions',
  description: 'Apply online and learn about our admission process.',
};

const steps = [
  { icon: FileText, title: 'Submit inquiry', desc: 'Fill out the online inquiry form. Takes ~3 minutes.' },
  { icon: Phone, title: 'Counselling call', desc: 'Our team will reach out within 2 business days.' },
  { icon: ClipboardCheck, title: 'Assessment', desc: 'Age-appropriate assessment & parent interview.' },
  { icon: CheckCircle2, title: 'Offer & enrolment', desc: 'Confirmation, fee payment and onboarding.' },
];

const eligibility = [
  'Pre-K: child must be 3 years old by June 1, 2026',
  'Grades 1–10: previous school records and one report card',
  'Grades 11–12: Grade 10 board certificate or equivalent',
  'All applicants: passport-size photograph and birth certificate',
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        title="Admissions"
        subtitle="Applications open for AY 2026–27. Submit an inquiry today."
        crumbs={[{ label: 'Admissions' }]}
      />

      <section className="section">
        <div className="container-wide grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">The process</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-serif font-semibold">Four simple steps</h2>
            <ol className="mt-8 space-y-5">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <div className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-xl
                                  bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-serif text-lg font-semibold">
                      {String(i + 1).padStart(2, '0')}. {s.title}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 glass-card p-6">
              <h3 className="font-serif text-xl font-semibold">Eligibility</h3>
              <ul className="mt-3 space-y-2">
                {eligibility.map((e) => (
                  <li key={e} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-brand-600 mt-0.5 shrink-0" />
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div id="apply" className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8">
            <h2 className="font-serif text-2xl font-semibold">Admission inquiry</h2>
            <p className="text-sm text-slate-500 mt-1">
              Provide a few details and we'll guide you through the rest.
            </p>
            <div className="mt-6">
              <AdmissionForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
