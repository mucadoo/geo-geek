export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen animate-pulse">
      <div className="h-[90px] w-full" /> {/* Header spacer */}
      <main className="container-custom flex-grow mt-4 mb-20">
        <div className="relative w-full text-center mb-16">
          <div className="h-10 w-48 bg-gray-200 rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 px-4">
          <section className="space-y-4">
            <div className="h-4 w-24 bg-gray-200 rounded mx-auto mb-8" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-4/5 bg-gray-200 rounded" />
            </div>
          </section>

          <section className="flex flex-col items-center">
            <div className="h-4 w-24 bg-gray-200 rounded mb-8" />
            <div className="w-[280px] h-[180px] bg-gray-200 rounded-xl" />
          </section>

          <section>
            <div className="h-4 w-24 bg-gray-200 rounded mx-auto mb-8" />
            <div className="w-full bg-white/40 rounded-xl p-6 border border-white/50 h-[300px]" />
          </section>
        </div>
      </main>
    </div>
  );
}
