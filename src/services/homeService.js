const mockHomeData = {
  statistics: {
    totalParticipants: "1,234명",
    todayPolls: "83개",
  },

  popularSpots: [
    {
      id: 1,
      rank: 1,
      name: "성수동 서울숲",
      recommendRate: 89,
      imageUrl: "",
      tone: "forest",
      tags: ["감성", "자연광"],
    },
    {
      id: 2,
      rank: 2,
      name: "앤트러사이트 한남점",
      recommendRate: 78,
      imageUrl: "",
      tone: "cafe",
      tags: ["카페", "실내"],
    },
    {
      id: 3,
      rank: 3,
      name: "한강공원 반포",
      recommendRate: 71,
      imageUrl: "",
      tone: "river",
      tags: ["야외", "노을"],
    },
  ],

  activePolls: [
    {
      id: 1,
      title: "이번 주말 인스타 업로드용✨",
      description: "마감 3일 남음 · 8장",
      role: "OWNER",
    },
    {
      id: 2,
      title: "우정사진 뭐가 좋아?",
      description: "마감 1일 남음 · 7장",
      role: "VOTER",
    },
  ],

  closedPolls: [
    {
      id: 3,
      title: "내 졸업사진 뽑기",
      description: "총 12명 참여",
      role: "OWNER",
    },
    {
      id: 4,
      title: "성수동 카페 프로필컷",
      description: "총 18명 참여",
      role: "OWNER",
    },
    {
      id: 5,
      title: "여행 피드 첫 장 고르기",
      description: "총 9명 참여",
      role: "OWNER",
    },
    {
      id: 6,
      title: "친구 생일 업로드 사진",
      description: "총 14명 참여",
      role: "VOTER",
    },
  ],
};

export const homeService = {
  getHomeData: async () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    if (!baseUrl) {
      return mockHomeData;
    }

    const response = await fetch(`${baseUrl}/home`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("홈 데이터를 불러오지 못했습니다.");
    }

    return response.json();
  },
};
