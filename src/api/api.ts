import axios from "axios";

export const instance = axios.create({
  baseURL: "https://talk-api.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.token = token ? `${token}` : "";
  return config;
});
