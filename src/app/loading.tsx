import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="container-wide pt-32 pb-20">
      <Skeleton className="h-10 w-2/3 max-w-xl mb-4" />
      <Skeleton className="h-5 w-1/2 max-w-md mb-12" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[16/10] w-full" />
        ))}
      </div>
    </div>
  );
}
