import api, { hasApiBaseUrl, unwrapApiResponse } from "./api";
import { pollStore } from "../store/pollStore";

const fallbackRankings = [
  {
    id: "sun-front",
    rank: 1,
    title: "햇살 정면 컷",
    rate: 86,
    votes: 24,
    comment: "",
    criteria: {
      composition: "",
      expression: "",
      lighting: "",
    },
    tone: "sun",
  },
  {
    id: "cafe-window",
    rank: 2,
    title: "카페 창가 컷",
    rate: 72,
    votes: 20,
    comment: "",
    criteria: {
      composition: "",
      expression: "",
      lighting: "",
    },
    tone: "cafe",
  },
  {
    id: "street-bg",
    rank: 3,
    title: "거리 배경 컷",
    rate: 58,
    votes: 16,
    comment: "",
    criteria: {
      composition: "",
      expression: "",
      lighting: "",
    },
    tone: "street",
  },
  {
    id: "forest-smile",
    rank: 4,
    title: "자연스러운 웃음 컷",
    rate: 44,
    votes: 12,
    comment: "",
    criteria: {
      composition: "",
      expression: "",
      lighting: "",
    },
    tone: "forest",
  },
  {
    id: "night-profile",
    rank: 5,
    title: "야간 프로필 컷",
    rate: 31,
    votes: 9,
    comment: "",
    criteria: {
      composition: "",
      expression: "",
      lighting: "",
    },
    tone: "cafe",
  },
];

const rankingRates = [86, 72, 58, 44, 31, 24, 18];

const hasAccessToken = () => (
  typeof window !== "undefined" && Boolean(window.localStorage.getItem("accessToken"))
);

const isNumericId = (value) => Number.isFinite(Number(value));

const resolvePhotoUrl = (photo) => (
  photo.imageUrl
  || photo.photoUrl
  || photo.s3Url
  || photo.thumbnailUrl
  || photo.previewUrl
  || ""
);

const buildRankings = (pollId) => {
  const storedPoll = pollStore.find(pollId);
  const photos = storedPoll?.photos ?? [];

  if (!photos.length) {
    return fallbackRankings;
  }

  return photos.map((photo, index) => ({
    id: photo.id ?? `photo-${index + 1}`,
    rank: index + 1,
    title: photo.label || photo.name || `후보 사진 ${index + 1}`,
    rate: rankingRates[index] ?? Math.max(52, 86 - index * 12),
    votes: Math.round((rankingRates[index] ?? 58) * 0.28),
    comment: "",
    criteria: {
      composition: "",
      expression: "",
      lighting: "",
    },
    imageUrl: resolvePhotoUrl(photo),
    photoUrl: resolvePhotoUrl(photo),
    tone: photo.tone,
  }));
};

const normalizeServerResult = ({ pollId, result, analysis }) => {
  const participantCount = result?.participantCount ?? 0;
  const rankings = (result?.photos || [])
    .slice()
    .sort((left, right) => (left.rank || 99) - (right.rank || 99))
    .map((photo, index) => ({
      id: String(photo.photoId ?? index + 1),
      rank: photo.rank ?? index + 1,
      title: `후보 사진 ${photo.sequence ?? index + 1}`,
      rate: photo.recommendRate ?? 0,
      votes: Math.round((participantCount * (photo.recommendRate ?? 0)) / 100),
      comment: photo.analysis?.mood || photo.analysis?.type || "",
      criteria: {
        composition: photo.analysis?.composition || "",
        expression: photo.analysis?.expression || "",
        lighting: photo.analysis?.lighting || "",
      },
      imageUrl: photo.imageUrl || "",
      photoUrl: photo.imageUrl || "",
    }));

  return {
    id: String(result?.voteId ?? pollId),
    title: result?.title || "Pickly 투표 결과",
    location: result?.spotName || "위치 미설정",
    participantCount,
    closedAt: new Date().toISOString(),
    analysis: {
      title: "AI 분석 인사이트",
      model: analysis?.modelName || "Pickly AI",
      summary: analysis?.summary || "친구들의 반응을 바탕으로 베스트컷을 정리했어요.",
      tags: analysis?.keywords || [],
    },
    rankings: rankings.length ? rankings : buildRankings(pollId),
  };
};

const fallbackMyPolls = () => {
  const storedPolls = pollStore.all();
  const activePolls = storedPolls
    .filter((poll) => poll.status !== "closed")
    .map((poll) => ({
      id: poll.id,
      title: poll.title,
      status: "진행중",
      count: 0,
      updatedAt: poll.createdAt || new Date().toISOString(),
    }));

  return {
    profile: {
      name: "게스트",
      mode: "둘러보기 모드",
    },
    stats: {
      createdPolls: activePolls.length || 6,
      receivedVotes: 128,
      bestCuts: 4,
    },
    activePolls: activePolls.length ? activePolls : [
      {
        id: "demo",
        title: "프로필 사진 골라줘",
        status: "마감까지 2일",
        count: 28,
        updatedAt: "2026-06-27T10:30:00.000Z",
      },
      {
        id: "cafe",
        title: "카페 업로드 사진",
        status: "마감까지 6시간",
        count: 9,
        updatedAt: "2026-06-27T08:20:00.000Z",
      },
    ],
    closedPolls: [
      {
        id: "summer",
        title: "여행 업로드 컷",
        status: "종료",
        count: 43,
        updatedAt: "2026-06-25T18:00:00.000Z",
      },
      {
        id: "profile",
        title: "새 프로필 후보",
        status: "종료",
        count: 28,
        updatedAt: "2026-06-22T13:10:00.000Z",
      },
    ],
  };
};

const normalizeMyVote = (vote, status) => ({
  id: String(vote.voteId ?? vote.id),
  title: vote.title,
  status: status === "active" ? vote.dDay || "진행중" : "종료",
  count: vote.participantCount ?? 0,
  updatedAt: new Date().toISOString(),
});

export const resultService = {
  getResult: async (pollId) => {
    if (hasApiBaseUrl && isNumericId(pollId)) {
      try {
        const [result, analysis] = await Promise.all([
          api.get(`/votes/${pollId}/result`).then(unwrapApiResponse),
          api.get(`/votes/${pollId}/analyze`).then(unwrapApiResponse).catch(() => null),
        ]);

        return normalizeServerResult({ pollId, result, analysis });
      } catch (error) {
        console.warn("서버 결과를 불러오지 못해 데모 결과로 전환합니다.", error);
      }
    }

    const storedPoll = pollStore.find(pollId);
    const rankings = buildRankings(pollId);

    return {
      id: pollId,
      title: storedPoll?.title || "프로필 사진 골라줘",
      location: storedPoll?.location || "서울숲",
      participantCount: 28,
      closedAt: "2026-06-29T18:00:00.000Z",
      analysis: {
        title: "AI 분석 인사이트",
        model: "Pickly AI",
        summary: "친구들은 밝은 표정과 깔끔한 배경이 있는 사진을 더 선호했어요.",
        tags: ["자연스러움", "밝은조명", "프로필추천"],
      },
      rankings,
    };
  },

  getMyPolls: async () => {
    if (!hasApiBaseUrl || !hasAccessToken()) {
      return fallbackMyPolls();
    }

    try {
      const [stats, myVotes] = await Promise.all([
        api.get("/mypage/stats").then(unwrapApiResponse),
        api.get("/votes/my").then(unwrapApiResponse),
      ]);

      return {
        profile: {
          name: stats?.nickname || "Pickly 사용자",
          mode: stats?.provider || "로그인 모드",
        },
        stats: {
          createdPolls: stats?.voteCount ?? 0,
          receivedVotes: stats?.receivedCount ?? 0,
          bestCuts: 0,
        },
        activePolls: (myVotes?.inProgress || []).map((vote) => normalizeMyVote(vote, "active")),
        closedPolls: (myVotes?.closed || []).map((vote) => normalizeMyVote(vote, "closed")),
      };
    } catch (error) {
      console.warn("마이페이지 API를 불러오지 못해 데모 데이터로 전환합니다.", error);
      return fallbackMyPolls();
    }
  },
};
