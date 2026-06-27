import { API_ORIGIN, AUTH_ORIGIN, hasApiBaseUrl } from "./api";

export const authService = {
  startSocialLogin: (provider) => {
    if (!hasApiBaseUrl) {
      console.log(`${provider} 로그인 요청`);
      return;
    }

    window.location.href = `${AUTH_ORIGIN}/oauth2/authorization/${provider}`;
  },

  getMyInfo: async () => {
    if (!hasApiBaseUrl) {
      return null;
    }

    const response = await fetch(`${API_ORIGIN}/api/users/me`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("사용자 정보를 불러오지 못했습니다.");
    }

    return response.json();
  },

  logout: async () => {
    if (!hasApiBaseUrl) {
      return { ok: true };
    }

    const response = await fetch(`${API_ORIGIN}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("로그아웃에 실패했습니다.");
    }

    return response.json();
  },
};
