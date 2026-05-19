import axios from "axios";
import { UniversityCard, UniversityDetail } from "@/types/university";
import Cookies from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

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

export const getFilterUniversities = async (countryId?: number): Promise<{id: number, name: string}[]> => {
  try {
    const response = await axios.get(`${baseUrl}/universities/by-country`, {
      params: countryId ? { countryId } : {},
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching universities:", error);
    return [];
  }
};

export const getFilterCountries = async (): Promise<{id: number, name: string}[]> => {
  try {
    const response = await axios.get(`${baseUrl}/api/country-masters`, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};

export const getFilterCourses = async (universityName: string): Promise<string[]> => {
  try {
    const response = await axios.get(`${baseUrl}/api/course-masters`, {
      headers: getAuthHeaders()
    });
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
    const courseResponse = await axios.get(`${baseUrl}/api/course-masters`, {
      headers: getAuthHeaders()
    });
    const course = courseResponse.data.find((c: any) => c.name === courseName);
    
    if (!course) return [];

    // 2. Fetch specializations for that course ID
    const response = await axios.get(`${baseUrl}/api/specialization-masters/by-course/${course.id}`, {
      headers: getAuthHeaders()
    });
    return response.data.map((spec: any) => spec.name);
  } catch (error) {
    console.error("Error fetching specializations:", error);
    return [];
  }
};

export const getMatchingMentorCount = async (universityName: string, course: string, specialization: string): Promise<number> => {
  try {
    const response = await axios.get(`${baseUrl}/api/search/mentors/count`, {
      params: { universityName, course, specialization },
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching mentor count:", error);
    return 0;
  }
};

export const getMentorCountByLocation = async (countryId: number, universityId: number): Promise<number> => {
  try {
    const response = await axios.get(`${baseUrl}/api/search/mentors/count-by-location`, {
      params: { countryId, universityId },
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching mentor count by location:", error);
    return 0;
  }
};

export const getAllMentors = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${baseUrl}/api/mentors`, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching mentors:", error);
    return [];
  }
};

export const getExploreInitialData = async (): Promise<{ countries: {id: number, name: string, code?: string, imgUrl?: string}[], universities: any[], mentors: any[] }> => {
  try {
    const response = await axios.get(`${baseUrl}/api/explore/initial`, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching initial explore data:", error);
    return { countries: [], universities: [], mentors: [] };
  }
};

export const getMentorsByCountryId = async (countryId: number): Promise<any[]> => {
  try {
    const response = await axios.get(`${baseUrl}/api/search/mentors/by-country`, {
      params: { countryId },
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching mentors by country:", error);
    return [];
  }
};
