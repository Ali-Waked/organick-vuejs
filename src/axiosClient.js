import axios from "axios";
const axiosClient = axios.create({
  // baseURL: 'https://some-domain.com/api/',
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // timeout: 1000,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    "x-api-key": import.meta.env.VITE_API_KEY,
    Accept: "application/json",
    "Content-Type": "application/json",
    // "content-type": "multipart/form-data",
  },
});

export default axiosClient;
