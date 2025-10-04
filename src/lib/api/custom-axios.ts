import Axios, { AxiosRequestConfig } from 'axios';

export const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5400';

export const axiosInstance = Axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth tokens
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if available
    // const token = getAuthToken(); // Implement your token retrieval logic
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const customAxios = <T>(config: AxiosRequestConfig): Promise<T> => {
  return axiosInstance.request<T>(config).then((response) => response.data);
};

export default customAxios;
