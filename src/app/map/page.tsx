import Header from '@/components/Header';
import Map from '@/components/Map';

export default function MapExplorer() {
  return (
    <div className="container-custom">
      <Header />
      <main className="animate-in fade-in duration-1000 flex flex-col items-center mt-6 mb-12">
        <h1 className="title">World Explorer</h1>
        <p className="text-center font-space text-gray-500 mb-8 max-w-2xl leading-relaxed">
          Hover to discover continent names, then <strong>click</strong> to fly directly over it. 
          Uncover global facts and jump straight into our country profiles!
        </p>
        <Map />
      </main>
    </div>
  );
}
