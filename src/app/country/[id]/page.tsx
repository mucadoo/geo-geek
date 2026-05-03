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
      <main className="container-custom flex-grow animate-in fade-in duration-1000 mt-4 mb-20 relative z-10">
        
        {/* Title & Back Button */}
        <div className="relative w-full text-center mb-16">
          <Link href="/map" className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors p-2">
            <ArrowLeft size={24} strokeWidth={1.5} />
          </Link>
          <h1 className="text-[36px] font-medium text-[#2c3e50] tracking-tight">{country.name}</h1>
        </div>

        {/* 3-Column Layout perfectly matching the Congo screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 px-4">
          
          {/* Column 1: Summary */}
          <section className="flex flex-col">
            <h2 className="text-center font-bold text-[15px] tracking-[0.2em] text-[#2c3e50] uppercase mb-8">
              Summary
            </h2>
            <p className="text-justify text-[14px] leading-[1.8] text-gray-600 font-light">
              {country.description}
            </p>
          </section>

          {/* Column 2: Flag */}
          <section className="flex flex-col items-center">
            <h2 className="text-center font-bold text-[15px] tracking-[0.2em] text-[#2c3e50] uppercase mb-8">
              Flag
            </h2>
            <div className="flex-grow flex items-start justify-center pt-4">
              <Image 
                src={country.flagUrl} 
                alt={`${country.name} flag`}
                width={280}
                height={200}
                className="max-w-[280px] w-full object-contain rounded-[8px] shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
              />
            </div>
          </section>

          {/* Column 3: Information Table */}
          <section className="flex flex-col">
            <h2 className="text-center font-bold text-[15px] tracking-[0.2em] text-[#2c3e50] uppercase mb-8">
              Information
            </h2>
            <Table>
              <TableBody>
                {infoRows.map((row) => (
                  <TableRow key={row.label}>
                    <TableCell className="py-3 font-semibold text-[11px] text-[#2c3e50] uppercase tracking-widest whitespace-nowrap">
                      {row.label}
                    </TableCell>
                    <TableCell className="py-3 text-[13px] text-gray-500 font-light text-right pl-4">
                      {row.value || 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>

        </div>
      </main>
    </div>
  );
}
