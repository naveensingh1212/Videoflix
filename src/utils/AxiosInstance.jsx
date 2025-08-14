import axios from "axios";

const accessToken = localStorage.getItem("accessToken");

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1/users", // or your deployed backend URL
  withCredentials: true,
});

export default axiosInstance;
