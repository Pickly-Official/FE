import { useEffect, useState } from "react";
import { getMyInfo, logout as requestLogout } from "../services/authService";

function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isLogin = !!localStorage.getItem("accessToken");

  const fetchMyInfo = async () => {
    if (!isLogin) return;

    try {
      setIsLoading(true);
      const data = await getMyInfo();
      setUser(data);
    } catch (error) {
      console.error("내 정보 조회 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await requestLogout();
    } catch (error) {
      console.error("로그아웃 실패:", error);
    } finally {
      localStorage.removeItem("accessToken");
      setUser(null);
    }
  };

  useEffect(() => {
    fetchMyInfo();
  }, []);

  return {
    user,
    isLogin,
    isLoading,
    fetchMyInfo,
    logout,
  };
}

export default useAuth;