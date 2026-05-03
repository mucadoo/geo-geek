import Header from '@/components/Header';
import { countryService } from '@/lib/countryService';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { RANKING_CATEGORIES, getRankingBySlug } from '@/config/rankingsConfig';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return RANKING_CATEGORIES.map((category) => ({
    slug: category.slug,
  }));
}

export default async function RankingDetail({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const category = getRankingBySlug(slug);

  if (!category) {
    notFound();
  }
  
  const rankings = await countryService.getRankings(category.title);

  let valueLabel = 'Value';
  if (category.title.includes('populous')) valueLabel = 'Population';
  if (category.title.includes('Larger') || category.title.includes('Smaller')) valueLabel = 'Area (km²)';
  if (category.title.includes('populated')) valueLabel = 'Pop Density (/km²)';
  if (category.title.includes('HDI')) valueLabel = 'HDI Score';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container-custom flex-grow animate-in fade-in duration-1000 mt-10 mb-20">
        
        <div className="relative w-full max-w-[800px] mx-auto text-center mb-12">
          <Link href="/rankings" className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors p-2">
            <ArrowLeft size={24} strokeWidth={1.5} />
          </Link>
          <h1 className="text-[32px] font-medium text-[#2c3e50] tracking-tight">{category.title}</h1>
        </div>

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
