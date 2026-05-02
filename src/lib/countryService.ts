import countriesData from '@/data/countries.json';
import { Country, RankingType } from '@/types';

const countries = countriesData as Country[];

export const countryService = {
  getAllCountries: (): Country[] => {
    return countries;
  },

  getCountryByIso: (isoCode: string): Country | undefined => {
    return countries.find(c => c.ISO_code.toUpperCase() === isoCode.toUpperCase());
  },

  getRankings: (type: RankingType): { country: string; value: string | number; isoCode: string }[] => {
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
