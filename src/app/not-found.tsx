import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center">
      <div className="container-wide text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">404</p>
        <h1 className="mt-3 font-serif text-5xl md:text-7xl font-semibold">Page not found</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          The page you're looking for may have been moved or no longer exists.
        </p>
        <div className="mt-8">
          <Button href="/">Back to home</Button>
        </div>
      </div>
    </section>
  );
}
