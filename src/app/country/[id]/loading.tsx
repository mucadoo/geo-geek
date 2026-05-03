import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="h-[90px] w-full" /> {/* Header spacer */}
      <main className="container-custom flex-grow mt-4 mb-20">
        <div className="relative w-full text-center mb-16">
          <Skeleton className="h-10 w-48 rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 px-4">
          <section className="space-y-4">
            <Skeleton className="h-4 w-24 mx-auto mb-8" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </section>

          <section className="flex flex-col items-center">
            <Skeleton className="h-4 w-24 mb-8" />
            <Skeleton className="w-[280px] h-[180px] rounded-xl" />
          </section>

          <section>
            <Skeleton className="h-4 w-24 mx-auto mb-8" />
            <Skeleton className="w-full h-[300px] rounded-xl" />
          </section>
        </div>
      </main>
    </div>
  );
}
