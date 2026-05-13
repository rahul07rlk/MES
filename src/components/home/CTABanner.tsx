import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function CTABanner() {
  return (
    <section className="section">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-[2rem] p-10 md:p-16
                        bg-gradient-night text-white">
          {/* grid + glow */}
          <div className="absolute inset-0 bg-dots opacity-30" />
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-cyan-500/30 blur-3xl animate-blob" />
          <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-gold-500/20 blur-3xl animate-blob" style={{ animationDelay: '6s' }} />

          <div className="relative grid md:grid-cols-5 gap-10 items-center">
            <div className="md:col-span-3">
              <p className="text-[11px] uppercase tracking-[0.28em] text-gold-400 font-semibold">
                Admissions 2026–27
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-tight tracking-tighter-2">
                Begin your child's <span className="gradient-text-gold">journey</span> with us.
              </h2>
              <p className="mt-4 text-base md:text-lg text-ink-200/90 max-w-xl">
                Inquire online today — our admissions team will reach out within two business days.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/admissions" variant="gold" size="lg">
                  Start Application <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  href="/contact"
                  size="lg"
                  className="bg-white/10 border border-white/25 text-white hover:bg-white/15 backdrop-blur"
                >
                  <MapPin className="h-4 w-4" /> Book a campus visit
                </Button>
              </div>
            </div>

            {/* mini info card — dark glass that always reads on the night bg */}
            <div className="md:col-span-2">
              <div className="rounded-2xl bg-white/[0.06] backdrop-blur-xl
                              border border-white/15 shadow-glass-lg p-6 text-white">
                <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-4">
                  Quick facts
                </p>
                <ul className="space-y-3 text-sm">
                  {[
                    'Grades K–12 · CBSE curriculum',
                    'Merit scholarships for Grade 9',
                    'Transport across Mahad & Raigad',
                    'Sports, arts & STEM clubs',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span className="text-white/90 leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
