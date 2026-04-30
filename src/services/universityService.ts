import axios from "axios";
import { UniversityCard, UniversityDetail } from "@/types/university";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// Mock data for initial UI implementation
const MOCK_UNIVERSITIES: UniversityDetail[] = [
  {
    id: 1,
    name: "Stanford University",
    tag: "Top for AI",
    location: "Stanford, CA, USA",
    country: "USA",
    countryId: "c_usa",
    isTop: true,
    cardImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCelKbb6MdF7UO5eTzXyAfUXUG2HajJ8wgUrJuxwICojId0aRAFmfa5ixkzkCcM3GMzPi5wOQ4ZY3zBQpKhu8OPrhF79BfonaxbpvdLDXYHMQX5uZe_iVVEV8ipgTjq4R5UaLyikThWKS0fwrPJMBDcZqGiUDTRgYAkxkh4ZE0vclKzLVJFmQF8TnEcrX6v14hG8PYLYg8_q4bDXyEpktIQA8dac0fRnH-hNkoJiq8ehX1UH2vlLruyiZIkign2sHPdwqltJ1NC-w",
    heroImage: "https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,q_75,w_1200/v1/crm/sanmateoca/shutterstock_4189008910-9b68011a5056a36_9b6802fa-5056-a36a-0bbb53c8e971b411.jpg",
    description: "Stanford University stands as a beacon of academic rigor and interdisciplinary innovation. Our mission is to bridge the gap between theoretical excellence and practical mentorship.",
    stats: {
      students: "17k+",
      mentors: "450+",
      globalRank: "#4"
    },
    programs: ["MS Computer Science", "MBA", "PhD Economics"],
    mentors: [
      {
        name: "Dr. Elena Thorne",
        role: "Principal AI Scientist at OpenAI",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
        tags: ["MS in Computer Science", "Machine Learning"],
        quote: "Focusing on the ethical implementation of large-scale neural networks.",
        online: true
      },
      {
        name: "Marcus Chen",
        role: "VP of Design at Stripe",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
        tags: ["MFA Interaction Design", "Systems Design"],
        quote: "Mastering the craft of invisible interfaces and complex user flows.",
        online: true
      }
    ]
  },
  {
    id: 2,
    name: "Oxford University",
    tag: "Top for STEM",
    location: "Oxford, UK",
    country: "United Kingdom",
    countryId: "c_uk",
    isTop: true,
    cardImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJENBfh2OgO-0Z_5hCdmda2Ynik8cxs-9gj86MPy2QFFs1ny78W9rbO6Ja2ZIhRXmBFBC4Vr_0qBJYgodcamVYqZNqjoNDbN-wBMXMQIk_PVsoIMloEWqFp00Y0xtS_RhChmxmL-CIX8pJxkHRGFsR7GyRAIuR7Tg402BEvvVq3pFTDesJSCzkDtWpZqdz8ydtJTlVBp4Vwgfi2cFy6NJHxm2odUL6Dya6XuVXS3C4SfzCFpEgWDwAO6NneqpvtVksq82Dc66Pvw",
    heroImage: "https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?auto=format&fit=crop&q=80&w=1200",
    description: "Oxford is a world-leading centre of learning, teaching and research and the oldest university in the English-speaking world.",
    stats: {
      students: "24k+",
      stats: "300+",
      globalRank: "#1"
    },
    programs: ["PhD Economics", "MS Mathematics", "BA History"],
    mentors: [
      {
        name: "Sarah Jenkins",
        role: "Senior Architect at Foster + Partners",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
        tags: ["M.Arch Architecture", "Urban Planning"],
        quote: "Exploring the intersection of sustainable materials and civic space.",
        online: false
      }
    ]
  }
];

export const getTopUniversities = async (): Promise<UniversityCard[]> => {
  try {
    // When backend is ready:
    // const response = await axios.get(`${baseUrl}/api/universities`, { params: { isTop: true } });
    // return response.data;
    
    // Fallback to mock for now
    return MOCK_UNIVERSITIES.filter(u => u.isTop);
  } catch (error) {
    console.error("Error fetching top universities:", error);
    return MOCK_UNIVERSITIES.filter(u => u.isTop);
  }
};

export const getUniversityById = async (id: string): Promise<UniversityDetail | null> => {
  try {
    // When backend is ready:
    // const response = await axios.get(`${baseUrl}/api/universities/${id}`);
    // return response.data;

    // Fallback to mock for now
    const university = MOCK_UNIVERSITIES.find(u => u.id === parseInt(id));
    return university || null;
  } catch (error) {
    console.error(`Error fetching university ${id}:`, error);
    return null;
  }
};
