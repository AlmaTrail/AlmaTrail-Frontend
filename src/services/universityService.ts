import axios from "axios";
import { UniversityCard, UniversityDetail } from "@/types/university";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

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
    const endpoint = process.env.NEXT_PUBLIC_GET_UNIVERSITY_BY_ID || `${baseUrl}/universities`;
    const response = await axios.get(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching university ${id}:`, error);
    return null;
  }
};

export const getFilterUniversities = async (): Promise<string[]> => {
  try {
    const response = await axios.get(`${baseUrl}/api/mentors/filters/universities`);
    return response.data;
  } catch (error) {
    console.error("Error fetching universities:", error);
    return [];
  }
};

export const getFilterCourses = async (universityName: string): Promise<string[]> => {
  try {
    const response = await axios.get(`${baseUrl}/api/mentors/filters/courses`, {
      params: { universityName }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

export const getFilterSpecializations = async (universityName: string, course: string): Promise<string[]> => {
  try {
    const response = await axios.get(`${baseUrl}/api/mentors/filters/specializations`, {
      params: { universityName, course }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching specializations:", error);
    return [];
  }
};

export const getMatchingMentorCount = async (universityName: string, course: string, specialization: string): Promise<number> => {
  try {
    const response = await axios.get(`${baseUrl}/api/mentors/search/count`, {
      params: { universityName, course, specialization }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching mentor count:", error);
    return 0;
  }
};
