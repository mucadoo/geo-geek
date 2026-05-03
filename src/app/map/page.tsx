import Header from '@/components/Header';
import Map from '@/components/Map';

export default function MapExplorer() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow animate-in fade-in duration-1000 relative w-full">
        <Map />
      </main>
    </div>
  );
}
