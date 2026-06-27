export const authService = {
  startSocialLogin: (provider) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    if (!baseUrl) {
      console.log(`${provider} 로그인 요청`);
      return;
    }

    window.location.href = `${baseUrl}/auth/oauth/${provider}`;
  },

  getMyInfo: async () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    if (!baseUrl) {
      return null;
    }

    const response = await fetch(`${baseUrl}/users/me`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("사용자 정보를 불러오지 못했습니다.");
    }

    return response.json();
  },

  logout: async () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    if (!baseUrl) {
      return { ok: true };
    }

    const response = await fetch(`${baseUrl}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("로그아웃에 실패했습니다.");
    }

    return response.json();
  },
};