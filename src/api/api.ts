import axios from "axios";

export const instance = axios.create({
  baseURL: "https://talk-backend-ajs1.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.token = token ? `${token}` : "";
  return config;
});
