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
      case 'Most populous countries':
        prop = 'population';
        break;
      case 'Less populous countries':
        prop = 'population';
        desc = false;
        filterEmpty = true;
        break;
      case 'Larger countries':
        prop = 'area_km2';
        break;
      case 'Smaller countries':
        prop = 'area_km2';
        desc = false;
        filterEmpty = true;
        break;
      case 'Most populated countries':
        prop = 'density_km2';
        break;
      case 'Less populated countries':
        prop = 'density_km2';
        desc = false;
        filterEmpty = true;
        break;
    }

    if (filterEmpty) {
      sorted = sorted.filter(c => (c[prop] as number) > 0);
    }

    sorted.sort((a, b) => {
      const valA = a[prop] as number;
      const valB = b[prop] as number;
      return desc ? valB - valA : valA - valB;
    });

    return sorted.slice(0, 5).map(c => ({
      country: c.name,
      value: c[prop] as number,
      isoCode: c.ISO_code
    }));
  }
};
