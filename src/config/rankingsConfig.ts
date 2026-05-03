import { RankingConfig } from '@/types';

export const RANKING_CATEGORIES: RankingConfig[] = [
  { title: 'Most populous countries', slug: 'most-populous-countries' },
  { title: 'Less populous countries', slug: 'less-populous-countries' },
  { title: 'Larger countries', slug: 'larger-countries' },
  { title: 'Smaller countries', slug: 'smaller-countries' },
  { title: 'Most populated countries', slug: 'most-populated-countries' },
  { title: 'Less populated countries', slug: 'less-populated-countries' },
  { title: 'Highest HDI', slug: 'highest-hdi' },
  { title: 'Lowest HDI', slug: 'lowest-hdi' },
];

export const getRankingBySlug = (slug: string): RankingConfig | undefined => {
  return RANKING_CATEGORIES.find((cat) => cat.slug === slug);
};

export const getRankingByTitle = (title: string): RankingConfig | undefined => {
  return RANKING_CATEGORIES.find((cat) => cat.title === title);
};
