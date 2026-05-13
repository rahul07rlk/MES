import { Breadcrumb, type Crumb } from './Breadcrumb';

export function PageHero({
  title, subtitle, crumbs,
}: { title: string; subtitle?: string; crumbs: Crumb[] }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      {/* mesh + grid backdrop */}
      <div className="absolute inset-0 bg-mesh opacity-70 pointer-events-none" />
      <div className="absolute inset-0 bg-dots opacity-40 pointer-events-none" />
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

      <div className="container-wide relative">
        <Breadcrumb items={crumbs} />
        <h1 className="mt-5 font-display text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tighter-2">
          <span className="gradient-text">{title}</span>
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base md:text-lg text-ink-600 dark:text-ink-300 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
