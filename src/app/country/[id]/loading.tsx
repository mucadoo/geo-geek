import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="h-[90px] w-full" />
      <main className="container-custom flex-grow mt-8 mb-20 px-4">
        
        {/* Hero Section Skeleton */}
        <div className="flex items-center gap-6 mb-12">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-64 rounded" />
            <Skeleton className="w-16 h-10 rounded" />
          </div>
        </div>

        {/* Bottom Section (Grid) Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Summary Skeleton */}
          <section className="lg:col-span-8 space-y-4">
            <Skeleton className="h-5 w-24 mb-6" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </section>

          {/* Table Sidebar Skeleton */}
          <section className="lg:col-span-4">
            <Skeleton className="h-5 w-24 mb-6" />
            <Skeleton className="w-full h-[400px] rounded-xl" />
          </section>

        </div>
      </main>
    </div>
  );
}
