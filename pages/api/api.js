import axios from "axios";

const API_BASE_URL = "https://ms.itmd-b1.com:5123/api/";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// export default axiosInstance;
