import axios from "axios";

const BASE_URL = 'http://localhost:5050';
const axiosInstance  = axios.create(
    {
        baseURL : BASE_URL,
        headers: {
            "Content-Type" : "application/json",
        },
        // Remove withCredentials for now to avoid CORS issues
        // Your backend should handle cookies automatically for same-origin requests
    }
)

export default axiosInstance;
