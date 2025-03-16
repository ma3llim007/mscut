import axios from "axios";

// Public Axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 10000,
    withCredentials: true,
});

export default axiosInstance;
