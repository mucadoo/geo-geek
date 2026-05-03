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

  return (
    <div className="container-custom">
      <Header />
      <main className="animate-in fade-in duration-1000 mt-8 mb-12">
        <header className="w-full flex items-center justify-between mb-10 card !py-4 !px-8">
          <Link href="/rankings" className="btn-accent !px-4 !py-2 flex items-center justify-center">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="title !mb-0 flex-grow">{decodedId}</h2>
        </header>

        <table className="mx-auto w-full max-w-[650px] border-collapse bg-white/80 rounded-[20px] shadow-xl overflow-hidden border border-white">
          <thead>
            <tr className="bg-primary text-white font-oswald tracking-widest text-lg uppercase">
              <th className="p-4 text-center w-24">Pos</th>
              <th className="p-4 text-left">Country</th>
              <th className="p-4 text-right">{valueLabel}</th>
            </tr>
          </thead>
          <tbody className="font-space">
            {rankings.map((item, index) => (
              <tr key={item.isoCode} className="border-b border-gray-100/50 last:border-0 hover:bg-white transition-colors">
                <td className="p-4 text-center font-bold text-gray-400">#{index + 1}</td>
                <td className="p-4 text-left">
                  <Link href={`/country/${item.isoCode}`} className="text-[#1c2e36] hover:text-primary font-bold transition-colors">
                    {item.country}
                  </Link>
                </td>
                <td className="p-4 text-right text-gray-600">
                  {item.value ? item.value.toLocaleString() : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
