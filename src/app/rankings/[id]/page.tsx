import Header from '@/components/Header';
import { countryService } from '@/lib/countryService';
import { RankingType } from '@/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function RankingDetail({ params }: { params: { id: string } }) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id) as RankingType;
  const rankings = await countryService.getRankings(decodedId);

  let valueLabel = 'Value';
  if (decodedId.includes('populous')) valueLabel = 'Population';
  if (decodedId.includes('Larger') || decodedId.includes('Smaller')) valueLabel = 'Area (km²)';
  if (decodedId.includes('populated')) valueLabel = 'Population Density (per km²)';

  return (
    <div className="container mx-auto">
      <Header />
      <main className="animate-in fade-in duration-1000">
        <header className="w-full h-[43px] flex items-center mb-10">
          <Link href="/rankings" className="px-5 text-geogeek-green-light hover:text-geogeek-green transition-colors drop-shadow-[1px_1px_0_#555]">
            <ArrowLeft size={25} />
          </Link>
          <h2 className="title flex-grow pr-[50px] mb-0">{decodedId}</h2>
        </header>

        <table className="mx-auto w-[500px] border-separate border-spacing-0 rounded-[10px] overflow-hidden">
          <thead>
            <tr className="font-raleway font-normal">
              <th className="bg-geogeek-green-light text-white border border-[#DDD] p-[10px] text-[1.4em]">Position</th>
              <th className="bg-geogeek-green-light text-white border border-[#DDD] p-[10px] text-[1.4em]">Country</th>
              <th className="bg-geogeek-green-light text-white border border-[#DDD] p-[10px] text-[1.4em]">{valueLabel}</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((item, index) => (
              <tr key={item.isoCode}>
                <td className="bg-white border border-geogeek-green-light p-[10px] text-[1.2em] font-raleway font-normal text-center">
                  {index + 1}
                </td>
                <td className="bg-white border border-geogeek-green-light p-[10px] text-[1.2em] font-raleway font-light text-center">
                  <Link href={`/country/${item.isoCode}`} className="hover:text-geogeek-blue transition-colors">
                    {item.country}
                  </Link>
                </td>
                <td className="bg-white border border-geogeek-green-light p-[10px] text-[1.2em] font-raleway font-light text-center">
                  {item.value.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
