import api, { hasApiBaseUrl, unwrapApiResponse } from "./api";
import { pollStore } from "../store/pollStore";

const popularSpotFallbacks = [
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
];

const mockHomeData = {
  statistics: {
    totalParticipants: "1,234명",
    todayPolls: "83개",
  },

  popularSpots: popularSpotFallbacks,

  activePolls: [
    {
      id: "demo",
      title: "이번 주말 인스타 업로드용",
      description: "마감 3일 남음 · 8장",
      role: "OWNER",
    },
    {
      id: "profile",
      title: "우정사진 뭐가 좋아?",
      description: "마감 1일 남음 · 7장",
      role: "VOTER",
    },
  ],

  closedPolls: [
    {
      id: "summer",
      title: "내 졸업사진 뽑기",
      description: "총 12명 참여",
      role: "OWNER",
    },
    {
      id: "cafe",
      title: "성수동 카페 프로필컷",
      description: "총 18명 참여",
      role: "OWNER",
    },
  ],
};

const hasAccessToken = () => (
  typeof window !== "undefined" && Boolean(window.localStorage.getItem("accessToken"))
);

const formatCount = (value, unit) => `${Number(value || 0).toLocaleString("ko-KR")}${unit}`;

const toneByIndex = (index) => ["forest", "cafe", "river"][index % 3];

const normalizePopularSpots = (spots = []) => {
  if (!spots.length) {
    return popularSpotFallbacks;
  }

  return spots.map((spot, index) => ({
    id: `${spot.rank || index + 1}-${spot.name}`,
    rank: spot.rank || index + 1,
    name: spot.name,
    recommendRate: spot.recommendRatio ?? spot.recommendRate ?? 0,
    imageUrl: "",
    tone: toneByIndex(index),
    tags: spot.keywords || spot.tags || [],
  }));
};

const normalizeVote = (vote, status) => ({
  id: String(vote.voteId ?? vote.id),
  title: vote.title,
  description: status === "active"
    ? `${vote.dDay || "진행중"} · ${formatCount(vote.participantCount, "명 참여")}`
    : `총 ${formatCount(vote.participantCount, "명 참여")}`,
  role: "OWNER",
});

const buildStoredPollGroups = () => {
  const polls = pollStore.all();

  return {
    activePolls: polls
      .filter((poll) => poll.status !== "closed")
      .map((poll) => ({
        id: poll.id,
        title: poll.title,
        description: poll.deadlineAt ? `마감 ${new Date(poll.deadlineAt).toLocaleDateString("ko-KR")}` : "진행중",
        role: "OWNER",
      })),
    closedPolls: polls
      .filter((poll) => poll.status === "closed")
      .map((poll) => ({
        id: poll.id,
        title: poll.title,
        description: "종료",
        role: "OWNER",
      })),
  };
};

const fetchMyVotes = async () => {
  if (!hasAccessToken()) {
    return buildStoredPollGroups();
  }

  try {
    const data = unwrapApiResponse(await api.get("/votes/my"));

    return {
      activePolls: (data?.inProgress || []).map((vote) => normalizeVote(vote, "active")),
      closedPolls: (data?.closed || []).map((vote) => normalizeVote(vote, "closed")),
    };
  } catch (error) {
    console.warn("내 투표 목록을 API에서 불러오지 못했습니다.", error);
    return buildStoredPollGroups();
  }
};

export const homeService = {
  getHomeData: async () => {
    if (!hasApiBaseUrl) {
      return mockHomeData;
    }

    try {
      const [stats, spots, myVotes] = await Promise.all([
        api.get("/home/stats").then(unwrapApiResponse),
        api.get("/home/spots/popular").then(unwrapApiResponse),
        fetchMyVotes(),
      ]);

      return {
        statistics: {
          totalParticipants: formatCount(stats?.totalParticipants, "명"),
          todayPolls: formatCount(stats?.todayVoteCount, "개"),
        },
        popularSpots: normalizePopularSpots(spots?.popularSpots || []),
        activePolls: myVotes.activePolls.length ? myVotes.activePolls : mockHomeData.activePolls,
        closedPolls: myVotes.closedPolls.length ? myVotes.closedPolls : mockHomeData.closedPolls,
      };
    } catch (error) {
      console.warn("홈 API를 불러오지 못해 데모 데이터로 전환합니다.", error);
      return mockHomeData;
    }
  },
};
