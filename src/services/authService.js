import api from "./api";

export const startSocialLogin = (provider) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  if (!baseUrl) {
    console.log(`${provider} 로그인 요청`);
    return;
  }

  window.location.href = `${baseUrl}/auth/oauth/${provider}`;
};

export const getMyInfo = async () => {
  const response = await api.get("/users/me");
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const deleteAccount = async () => {
  const response = await api.delete("/users/me");
  return response.data;
};