import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development" ? backendUrl + "/api" : "/api",
  withCredentials: true,
});

export default axiosInstance;
