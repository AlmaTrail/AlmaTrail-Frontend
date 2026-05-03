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
  id: number;
  name: string;
  profilePicUrl: string;
  bio: string;
  halfHourSessionPrice: number;
  oneHourSessionPrice: number;
  country: string;
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
