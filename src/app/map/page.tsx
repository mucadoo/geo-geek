import Header from '@/components/Header';
import Map from '@/components/Map';

export default function MapExplorer() {
  return (
    <div className="container mx-auto">
      <Header />
      <main className="relative bg-white rounded-[15px] h-[500px] shadow-[5px_5px_15px_#CCC] animate-in fade-in duration-1000">
        <Map />
      </main>
    </div>
  );
}
