import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  //   withCredentials: true, // nếu có cookie / auth
});

// Optional: interceptor gắn token
// axiosClient.interceptors.request.use((config) => {
//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });
