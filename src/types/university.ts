export interface UniversityCard {
  id: number;
  name: string;
  tag: string;
  location: string;
  cardImage: string;
  countryId: string;
  isTop: boolean;
}

export interface UniversityMentor {
  name: string;
  role: string;
  image: string;
  tags: string[];
  quote: string;
  online: boolean;
}

export interface UniversityDetail extends UniversityCard {
  country: string;
  heroImage: string;
  description: string;
  stats: {
    students: string;
    mentors: string;
    globalRank: string;
  };
  programs: string[];
  mentors: UniversityMentor[];
}
