import Header from '@/components/Header';
import { countryService } from '@/lib/countryService';
import { RankingType } from '@/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function generateStaticParams() {
  const rankingCategories =[
    'Most populous countries',
    'Less populous countries',
    'Larger countries',
    'Smaller countries',
    'Most populated countries',
    'Less populated countries',
    'Highest HDI',
    'Lowest HDI',
  ];
  return rankingCategories.map((category) => ({
    id: encodeURIComponent(category),
  }));
}

export default async function RankingDetail({ params }: { params: { id: string } }) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id) as RankingType;
  const rankings = await countryService.getRankings(decodedId);

  let valueLabel = 'Value';
  if (decodedId.includes('populous')) valueLabel = 'Population';
  if (decodedId.includes('Larger') || decodedId.includes('Smaller')) valueLabel = 'Area (km²)';
  if (decodedId.includes('populated')) valueLabel = 'Pop Density (/km²)';
  if (decodedId.includes('HDI')) valueLabel = 'HDI Score';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container-custom flex-grow animate-in fade-in duration-1000 mt-10 mb-20">
        
        <div className="relative w-full max-w-[800px] mx-auto text-center mb-12">
          <Link href="/rankings" className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors p-2">
            <ArrowLeft size={24} strokeWidth={1.5} />
          </Link>
          <h1 className="text-[32px] font-medium text-[#2c3e50] tracking-tight">{decodedId}</h1>
        </div>

        <div className="max-w-[800px] mx-auto bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="pb-4 pt-2 font-bold text-[12px] text-gray-400 uppercase tracking-widest text-center w-20">Rank</th>
                <th className="pb-4 pt-2 font-bold text-[12px] text-gray-400 uppercase tracking-widest pl-4">Country</th>
                <th className="pb-4 pt-2 font-bold text-[12px] text-gray-400 uppercase tracking-widest text-right">{valueLabel}</th>
              </tr>
            </thead>
            <tbody>
              {rankings.map((item, index) => (
                <tr key={item.isoCode} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="py-5 text-center font-semibold text-[15px] text-gray-400">
                    {index + 1}
                  </td>
                  <td className="py-5 pl-4">
                    <Link href={`/country/${item.isoCode}`} className="font-medium text-[#2c3e50] hover:text-primary transition-colors text-[16px]">
                      {item.country}
                    </Link>
                  </td>
                  <td className="py-5 text-right font-light text-gray-500 text-[15px]">
                    {item.value ? item.value.toLocaleString() : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
