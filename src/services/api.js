import axios from "axios";

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").trim().replace(/\/+$/, "");
export const hasApiBaseUrl = Boolean(API_BASE_URL);
export const API_ORIGIN = hasApiBaseUrl
  ? API_BASE_URL.replace(/\/api$/, "")
  : "";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
    }

    return Promise.reject(error);
  },
);

export const unwrapApiResponse = (response) => {
  const body = response?.data;

  if (!body || typeof body !== "object" || !("success" in body)) {
    return body;
  }

  if (!body.success) {
    throw new Error(body.message || "API 요청에 실패했습니다.");
  }

  return body.data;
};

export default api;
