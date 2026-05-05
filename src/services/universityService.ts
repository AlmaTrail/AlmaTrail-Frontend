import axios from "axios";
import { UniversityCard, UniversityDetail } from "@/types/university";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const getTopUniversities = async (): Promise<UniversityCard[]> => {
  try {
    const response = await axios.get(`${baseUrl}/universities`, { params: { isTop: true } });
    return response.data;
  } catch (error) {
    console.error("Error fetching top universities:", error);
    return [];
  }
};

export const getUniversityById = async (id: string): Promise<UniversityDetail | null> => {
  try {
    const response = await axios.get(`${baseUrl}/universities/${id}`);
    const data = response.data;
    
    // Map backend DTO to frontend interface
    return {
      ...data,
      stats: {
        students: data.studentsCount ? `${data.studentsCount}+` : "N/A",
        mentors: data.mentorsCount ? `${data.mentorsCount}+` : "N/A",
        globalRank: data.globalRank ? `#${data.globalRank}` : "N/A",
      },
      programs: data.programs || [], // Fallback since backend doesn't send programs yet
      mentors: (data.mentors || []).map((m: any) => ({
        name: m.name,
        role: "Mentor", // Fallback role
        image: m.profilePicUrl || `https://ui-avatars.com/api/?name=${m.name}`,
        tags: m.country ? [m.country] : [], // Fallback tags
        quote: m.bio || "Happy to help students reach their goals!",
        online: true
      }))
    };
  } catch (error) {
    console.error(`Error fetching university ${id}:`, error);
    return null;
  }
};

export const getFilterUniversities = async (): Promise<string[]> => {
  try {
    const response = await axios.get(`${baseUrl}/universities/names`);
    return response.data;
  } catch (error) {
    console.error("Error fetching universities:", error);
    return [];
  }
};

export const getFilterCourses = async (universityName: string): Promise<string[]> => {
  try {
    const response = await axios.get(`${baseUrl}/api/course-masters`);
    // Extract names from the objects returned by the API
    return response.data.map((course: any) => course.name);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

export const getFilterSpecializations = async (universityName: string, courseName: string): Promise<string[]> => {
  try {
    // 1. We need to find the course ID first to get its specializations.
    // If the backend had a search endpoint this would be easier, but we can fetch all courses and find the ID.
    const courseResponse = await axios.get(`${baseUrl}/api/course-masters`);
    const course = courseResponse.data.find((c: any) => c.name === courseName);
    
    if (!course) return [];

    // 2. Fetch specializations for that course ID
    const response = await axios.get(`${baseUrl}/api/specialization-masters/by-course/${course.id}`);
    return response.data.map((spec: any) => spec.name);
  } catch (error) {
    console.error("Error fetching specializations:", error);
    return [];
  }
};

export const getMatchingMentorCount = async (universityName: string, course: string, specialization: string): Promise<number> => {
  try {
    const response = await axios.get(`${baseUrl}/api/search/mentors/count`, {
      params: { universityName, course, specialization }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching mentor count:", error);
    return 0;
  }
};
