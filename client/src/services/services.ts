// services.ts (or api.ts)
import axios from 'axios';

// Define the base URL for your API
const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3007";

// Create the axios instance with the base URL and default headers
export const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export const getFitnessData = async (patientID: number): Promise<any> => {
  try {
    const response = await httpClient.get(`/api/fitness/${patientID}`);
    return response.data;
  } catch (error) {
    throw error;
  }
 }; 


export const loginUser = async (username: string, password: string): Promise<any> => {
    try {
      const response = await httpClient.post('/api/login', { username, password });
      return response.data;  // This will return the response from the backend
    } catch (error) {
      throw error;
    }
  };
  
  export const signupUser = async (username: string, password: string, role: number): Promise<any> => {
    try {
      const response = await httpClient.post('/api/signup', { username, password, role });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const deleteUser = async (): Promise<any> => {
    try {
      const response = await httpClient.delete(`/api/delete`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };