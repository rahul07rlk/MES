import { Breadcrumb, type Crumb } from './Breadcrumb';

export function PageHero({
  title, subtitle, crumbs,
}: { title: string; subtitle?: string; crumbs: Crumb[] }) {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20 bg-hero-pattern">
      <div className="container-wide">
        <Breadcrumb items={crumbs} />
        <h1 className="mt-4 text-4xl md:text-6xl font-serif font-semibold tracking-tight">
          <span className="gradient-text">{title}</span>
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base md:text-lg text-slate-600 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
