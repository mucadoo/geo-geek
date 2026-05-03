import Header from '@/components/Header';
import { countryService } from '@/lib/countryService';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
    <div className="container-custom">
      <Header />
      <main className="animate-in fade-in duration-1000 mt-6 mb-12">
        <header className="w-full flex items-center justify-between mb-10 card !py-4 !px-8">
          <Link href="/map" className="btn-accent !px-4 !py-2 flex items-center justify-center">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="title !mb-0 flex-grow">{country.name}</h2>
        </header>

        <div className="flex flex-wrap -mx-[10px]">
          <section className="w-1/3 px-[10px]">
            <div className="card h-full !p-6 flex flex-col">
              <h3 className="font-oswald text-2xl font-bold uppercase tracking-wider text-[#1c2e36] mb-4 text-center">Summary</h3>
              <p className="font-space text-gray-600 leading-relaxed text-justify text-[14px]">
                {country.description}
              </p>
            </div>
          </section>

          <section className="w-1/3 px-[10px]">
            <div className="card h-full !p-6 flex flex-col items-center">
              <h3 className="font-oswald text-2xl font-bold uppercase tracking-wider text-[#1c2e36] mb-6">Flag</h3>
              <div className="relative w-full flex items-center justify-center flex-grow">
                <img 
                  src={country.flagUrl} 
                  alt={`${country.name} flag`}
                  className="max-w-full max-h-[160px] object-contain rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.1)] border border-gray-100"
                />
              </div>
            </div>
          </section>

          <section className="w-1/3 px-[10px]">
            <div className="card h-full !p-6">
              <h3 className="font-oswald text-2xl font-bold uppercase tracking-wider text-[#1c2e36] mb-4 text-center">Information</h3>
              <table className="w-full text-left border-collapse rounded-xl overflow-hidden shadow-sm">
                <tbody className="bg-white/50">
                  {infoRows.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? "bg-white" : ""}>
                      <td className="font-oswald font-bold py-2 px-3 text-[#1c2e36] text-[13px] uppercase tracking-wide border-b border-gray-100">
                        {row.label}
                      </td>
                      <td className="font-space py-2 px-3 text-gray-600 text-[13px] border-b border-gray-100 text-right">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
