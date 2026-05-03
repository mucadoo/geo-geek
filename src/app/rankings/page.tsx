import Header from '@/components/Header';
import Link from 'next/link';

const rankingCategories =[
  'Most populous countries',
  'Less populous countries',
  'Larger countries',
  'Smaller countries',
  'Most populated countries',
  'Less populated countries',
];

export default function Rankings() {
  return (
    <div className="container-custom">
      <Header />
      <main className="animate-in fade-in duration-1000 mt-8 mb-16">
        <h1 className="title">Global Rankings</h1>
        <div className="flex flex-wrap -mx-3 mt-10">
          {rankingCategories.map((category) => (
            <div key={category} className="w-1/3 px-3 mb-6">
              <Link 
                href={`/rankings/${encodeURIComponent(category)}`}
                className="card flex flex-col justify-center h-[200px] text-center border-b-4 border-b-transparent hover:border-b-primary hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              >
                <p className="font-oswald text-2xl font-bold uppercase tracking-wider text-[#1c2e36] group-hover:text-primary transition-colors">
                  {category}
                </p>
                <span className="inline-block mt-4 text-gray-400 font-space text-sm group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                  View List →
                </span>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
