import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
    baseURL: `${API_URL}/api`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
      },
    
});