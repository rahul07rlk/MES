import { Button } from '@/components/ui/Button';

export function CTABanner() {
  return (
    <section className="section">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-3xl p-10 md:p-16
                        bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 text-white">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl" />
          <div className="relative max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-accent-300 font-semibold">
              Admissions 2026–27
            </p>
            <h2 className="mt-3 font-serif text-3xl md:text-5xl font-semibold leading-tight">
              Begin your child's journey with us.
            </h2>
            <p className="mt-4 text-base md:text-lg text-white/85">
              Inquire online today — our admissions team will reach out within two business days.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/admissions" variant="accent" size="lg">
                Start application
              </Button>
              <Button
                href="/contact"
                size="lg"
                className="bg-white/10 border border-white/30 text-white hover:bg-white/20"
              >
                Book a campus visit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
