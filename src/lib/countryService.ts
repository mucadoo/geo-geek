import { Country, RankingType } from '@/types';

let cachedCountries: Country[] | null = null;

async function fetchCountries(): Promise<Country[]> {
  if (cachedCountries) return cachedCountries;

  const url = process.env.NEXT_PUBLIC_COUNTRIES_JSON_URL || 'https://mucadoo.github.io/country-info-scraper/countries.min.json';
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch country data');
  }

  cachedCountries = await response.json();
  return cachedCountries!;
}

export const countryService = {
  getAllCountries: async (): Promise<Country[]> => {
    return await fetchCountries();
  },

  getCountryByIso: async (isoCode: string): Promise<Country | undefined> => {
    const countries = await fetchCountries();
    return countries.find(c => c.ISO_code.toUpperCase() === isoCode.toUpperCase());
  },

  getRankings: async (type: RankingType): Promise<{ country: string; value: string | number; isoCode: string }[]> => {
    const countries = await fetchCountries();
    let sorted = [...countries];
    let prop: keyof Country;
    let desc = true;
    let filterEmpty = false;

    switch (type) {
      case 'Most populous countries': prop = 'population'; break;
      case 'Less populous countries': prop = 'population'; desc = false; filterEmpty = true; break;
      case 'Larger countries': prop = 'area_km2'; break;
      case 'Smaller countries': prop = 'area_km2'; desc = false; filterEmpty = true; break;
      case 'Most populated countries': prop = 'density_km2'; break;
      case 'Less populated countries': prop = 'density_km2'; desc = false; filterEmpty = true; break;
      case 'Highest HDI': prop = 'HDI'; filterEmpty = true; break;
      case 'Lowest HDI': prop = 'HDI'; desc = false; filterEmpty = true; break;
    }

    if (filterEmpty) {
      if (prop === 'HDI') {
        sorted = sorted.filter(c => c.HDI && c.HDI !== 'N/A' && !isNaN(parseFloat(c.HDI)));
      } else {
        sorted = sorted.filter(c => (c[prop] as number) > 0);
      }
    }

    sorted.sort((a, b) => {
      let valA = a[prop];
      let valB = b[prop];

      if (prop === 'HDI') {
        valA = parseFloat(valA as string);
        valB = parseFloat(valB as string);
      }

      return desc ? (valB as number) - (valA as number) : (valA as number) - (valB as number);
    });

    return sorted.slice(0, 10).map(c => ({
      country: c.name,
      value: prop === 'HDI' ? c[prop] as string : c[prop] as number,
      isoCode: c.ISO_code
    }));
  }
};
