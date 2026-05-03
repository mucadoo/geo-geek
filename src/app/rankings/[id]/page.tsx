import Header from '@/components/Header';
import { countryService } from '@/lib/countryService';
import { RankingType } from '@/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';

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
    id: encodeURIComponent(category), // Encode so Next.js handles it properly in static export
  }));
}

export default async function RankingDetail({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  // Safely decode in case of double encoding (e.g. Larger%2520countries -> Larger%20countries -> Larger countries)
  const decodedId = decodeURIComponent(id).replace(/%20/g, ' ') as RankingType;
  
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

        {/* Re-added the white background padding box here so it matches the beautiful UI */}
        <div className="max-w-[800px] mx-auto bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center w-20">Rank</TableHead>
                <TableHead className="pl-4">Country</TableHead>
                <TableHead className="text-right pr-4">{valueLabel}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rankings.map((item, index) => (
                <TableRow key={item.isoCode}>
                  <TableCell className="text-center font-semibold text-gray-400">
                    {index + 1}
                  </TableCell>
                  <TableCell className="pl-4">
                    <Link href={`/country/${item.isoCode}`} className="font-medium text-[#2c3e50] hover:text-primary transition-colors text-[16px]">
                      {item.country}
                    </Link>
                  </TableCell>
                  <TableCell className="text-right font-light text-gray-500 pr-4">
                    {item.value ? item.value.toLocaleString() : 'N/A'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
