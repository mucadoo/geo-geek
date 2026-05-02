import Header from '@/components/Header';
import Link from 'next/link';

const rankingCategories = [
  'Most populous countries',
  'Less populous countries',
  'Larger countries',
  'Smaller countries',
  'Most populated countries',
  'Less populated countries',
];

export default function Rankings() {
  return (
    <div className="container mx-auto">
      <Header />
      <main className="flex flex-wrap -mx-[10px] animate-in fade-in duration-1000">
        {rankingCategories.map((category) => (
          <div key={category} className="w-[300px] px-[10px] mb-5">
            <Link 
              href={`/rankings/${encodeURIComponent(category)}`}
              className="block h-[200px] pt-[50px] text-center bg-white border border-[#999] rounded-[10px] transition-colors hover:text-geogeek-blue"
            >
              <p className="big-text px-4">{category}</p>
            </Link>
          </div>
        ))}
      </main>
    </div>
  );
}
