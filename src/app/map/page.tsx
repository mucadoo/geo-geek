import Header from '@/components/Header';
import Map from '@/components/Map';

export default function MapExplorer() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Wrapped in container-custom to keep it strictly aligned with the header */}
      <main className="container-custom flex-grow animate-in fade-in duration-1000 relative w-full mb-10 mt-2">
        <Map />
      </main>
    </div>
  );
}
