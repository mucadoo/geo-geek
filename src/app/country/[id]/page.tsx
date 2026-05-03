import Header from '@/components/Header';
import { countryService } from '@/lib/countryService';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/Table';

export async function generateStaticParams() {
  const countries = await countryService.getAllCountries();
  return countries.map((country) => ({
    id: country.ISO_code,
  }));
}

export default async function CountryInfo({ params }: { params: { id: string } }) {
  const { id } = await params;
  const country = await countryService.getCountryByIso(id);

  if (!country) {
    notFound();
  }

  const infoRows =[
    { label: 'Capital', value: country.capital },
    { label: 'Largest City', value: country.largest_city },
    { label: 'Languages', value: country.official_language },
    { label: 'Demonym', value: country.demonym },
    { label: 'Government', value: country.government },
    { label: 'Area', value: `${country.area_km2.toLocaleString()} km²` },
    { label: 'Population', value: country.population.toLocaleString() },
    { label: 'GDP', value: country.GDP },
    { label: 'HDI', value: country.HDI },
    { label: 'Currency', value: country.currency },
    { label: 'Time Zone', value: country.time_zone },
    { label: 'Calling code', value: country.calling_code },
    { label: 'ISO Code', value: country.ISO_code },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container-custom flex-grow animate-in fade-in duration-1000 mt-8 mb-20 px-4">
        
        {/* Top Section (Hero) */}
        <div className="flex items-center gap-6 mb-12">
          <Link href="/map" className="text-gray-500 hover:text-primary transition-colors p-2">
            <ArrowLeft size={24} strokeWidth={1.5} />
          </Link>
          <div className="flex items-center gap-4">
            <h1 className="text-[40px] font-medium text-[#2c3e50] tracking-tight">{country.name}</h1>
            <Image 
              src={country.flagUrl} 
              alt={`${country.name} flag`}
              width={64}
              height={40}
              className="w-16 h-10 object-cover rounded shadow-sm"
            />
          </div>
        </div>

        {/* Bottom Section (Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Content (Summary) */}
          <section className="lg:col-span-8">
            <h2 className="font-bold text-[15px] tracking-[0.2em] text-[#2c3e50] uppercase mb-6">
              Summary
            </h2>
            <p className="text-[15px] leading-[1.8] text-gray-600 font-light text-justify">
              {country.description}
            </p>
          </section>

          {/* Right Content (Information Table) */}
          <section className="lg:col-span-4">
            <h2 className="font-bold text-[15px] tracking-[0.2em] text-[#2c3e50] uppercase mb-6">
              Information
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <Table>
                <TableBody>
                  {infoRows.map((row) => (
                    <TableRow key={row.label} className="border-none">
                      <TableCell className="py-2.5 font-semibold text-[11px] text-[#2c3e50] uppercase tracking-widest whitespace-nowrap px-0">
                        {row.label}
                      </TableCell>
                      <TableCell className="py-2.5 text-[13px] text-gray-500 font-light text-right px-0">
                        {row.value || 'N/A'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
