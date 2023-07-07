import axios from "axios";

export const instance = axios.create({
  baseURL: window.location.origin,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.token = token ? `${token}` : "";
  return config;
});
