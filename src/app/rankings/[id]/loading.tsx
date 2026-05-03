import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="container-custom py-12">
      <Skeleton className="h-10 w-64 mb-8" />
      <div className="w-full bg-white/40 rounded-xl border border-white/50 overflow-hidden">
        <Skeleton className="h-16 rounded-b-none" />
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-12 rounded-none border-b border-gray-200 last:border-0" />
        ))}
      </div>
    </div>
  );
}
