export interface Country {
  ISO_code: string;
  name: string;
  flagUrl: string;
  description: string;
  capital: string;
  largest_city: string;
  population: number;
  area_km2: number;
  density_km2: number;
  government: string;
  official_language: string;
  demonym: string;
  GDP: string;
  HDI: string;
  currency: string;
  time_zone: string;
  calling_code: string;
  internet_TLD: string;
}

export type RankingType = 
  | 'Most populous countries'
  | 'Less populous countries'
  | 'Larger countries'
  | 'Smaller countries'
  | 'Most populated countries'
  | 'Less populated countries'
  | 'Highest HDI'
  | 'Lowest HDI';
