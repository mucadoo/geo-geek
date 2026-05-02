import Header from '@/components/Header';
import { countryService } from '@/lib/countryService';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function CountryInfo({ params }: { params: { id: string } }) {
  const { id } = await params;
  const country = await countryService.getCountryByIso(id);

  if (!country) {
    notFound();
  }

  const infoRows = [
    { label: 'Capital', value: country.capital },
    { label: 'Largest City', value: country.largest_city },
    { label: 'Official languages', value: country.official_language },
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
    { label: 'Internet TLD', value: country.internet_TLD },
  ];

  return (
    <div className="container mx-auto">
      <Header />
      <main className="animate-in fade-in duration-1000">
        <header className="w-full h-[43px] flex items-center mb-8">
          <Link href="/map" className="px-5 text-geogeek-green-light hover:text-geogeek-green transition-colors drop-shadow-[1px_1px_0_#555]">
            <ArrowLeft size={25} />
          </Link>
          <h2 className="title flex-grow pr-[50px] mb-0">{country.name}</h2>
        </header>

        <div className="flex flex-wrap -mx-[10px]">
          <section className="w-[300px] px-[10px]">
            <h3 className="title text-[24px]">Summary</h3>
            <article>
              <p className="medium-text text-justify">
                {country.description}
              </p>
            </article>
          </section>

          <section className="w-[300px] px-[10px]">
            <figure className="mb-[30px]">
              <figcaption className="title text-[24px]">Flag</figcaption>
              <div className="relative h-[200px] flex items-center justify-center">
                <img 
                  src={country.flagUrl} 
                  alt={`${country.name} flag`}
                  className="max-w-[275px] max-h-[200px] block mx-auto"
                />
              </div>
            </figure>
          </section>

          <section className="w-[300px] px-[10px]">
            <h3 className="title text-[24px]">Info</h3>
            <table className="w-full border-collapse">
              <tbody>
                {infoRows.map((row) => (
                  <tr key={row.label} className="border-t border-black">
                    <td className="font-raleway font-normal py-[5px] px-[7px] text-center text-[15px] rounded-[10px]">
                      {row.label}
                    </td>
                    <td className="font-raleway font-light py-[5px] px-[7px] text-center text-[15px] rounded-[10px]">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </div>
  );
}
