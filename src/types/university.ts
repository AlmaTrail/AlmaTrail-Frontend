export interface UniversityCard {
  id: number;
  name: string;
  tag: string;
  location: string;
  cardImage: string;
  countryId: string;
  isTop: boolean;
}

export interface UniversityDetail {
  id: number;
  name: string;
  tag: string;
  location: string;
  country: string;
  heroImage: string;
  description: string;
  globalRank: number;
  studentsCount: number;
  mentorsCount: number;
}
