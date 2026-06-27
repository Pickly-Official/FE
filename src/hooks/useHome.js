import { useEffect, useState } from "react";

import { homeService } from "../services/homeService";

export function useHome() {
  const [homeData, setHomeData] = useState({
    statistics: null,
    popularSpots: [],
    activePolls: [],
    closedPolls: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    const fetchHomeData = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const data = await homeService.getHomeData();

        if (!ignore) {
          setHomeData(data);
        }
      } catch (error) {
        if (!ignore) {
          setErrorMessage(error.message || "홈 데이터를 불러오지 못했습니다.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    fetchHomeData();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    homeData,
    isLoading,
    errorMessage,
  };
}