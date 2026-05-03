import Header from '@/components/Header';
import Link from 'next/link';

const rankingCategories =[
  'Most populous countries',
  'Less populous countries',
  'Larger countries',
  'Smaller countries',
  'Highest HDI',
  'Lowest HDI',
];

export default function Rankings() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container-custom flex-grow animate-in fade-in duration-1000 mt-10 mb-20">
        <h1 className="text-[36px] font-medium text-center text-[#2c3e50] tracking-tight mb-16">Global Rankings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
          {rankingCategories.map((category) => (
            <Link 
              key={category}
              href={`/rankings/${category}`}
              className="bg-white rounded-2xl h-[140px] flex items-center justify-center text-center px-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,168,181,0.1)] hover:border-primary/20 transition-all duration-300 group"
            >
              <h3 className="font-medium text-[16px] text-gray-700 group-hover:text-primary transition-colors">
                {category}
              </h3>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
