import api, { hasApiBaseUrl, unwrapApiResponse } from "./api";
import { pollStore } from "../store/pollStore";

const demoPoll = {
  id: "demo",
  title: "프로필 사진 골라줘",
  owner: "도경",
  location: "서울숲",
  photos: [
    {
      id: "cafe-window",
      label: "카페 창가 컷",
      description: "창가 빛이 자연스럽게 들어온 사진",
      tone: "cafe",
    },
    {
      id: "sun-front",
      label: "햇살 정면 컷",
      description: "표정과 조명이 가장 밝은 정면 사진",
      tone: "sun",
    },
    {
      id: "street-bg",
      label: "거리 배경 컷",
      description: "성수 골목 배경이 잘 보이는 사진",
      tone: "street",
    },
    {
      id: "natural-smile",
      label: "자연스러운 웃음 컷",
      description: "웃는 표정이 편안하게 나온 사진",
      tone: "forest",
    },
  ],
};

const isNumericId = (value) => Number.isFinite(Number(value));

const getDeviceToken = () => {
  if (typeof window === "undefined") {
    return "pickly-browser";
  }

  const key = "pickly.deviceToken";
  const storedToken = window.localStorage.getItem(key);

  if (storedToken) {
    return storedToken;
  }

  const nextToken = `web-${window.crypto?.randomUUID?.() || Date.now()}`;
  window.localStorage.setItem(key, nextToken);
  return nextToken;
};

const normalizePhoto = (photo, index) => ({
  id: String(photo.photoId ?? photo.id ?? index + 1),
  label: `사진 ${photo.sequence ?? index + 1}`,
  description: "",
  imageUrl: photo.imageUrl || photo.previewUrl || "",
});

const fetchServerPoll = async (pollId) => {
  const data = unwrapApiResponse(await api.get(`/votes/${pollId}/photos`));

  return {
    id: String(data.voteId ?? pollId),
    title: data.title || "Pickly 투표",
    owner: "Pickly",
    location: "위치 미설정",
    photos: (data.photos || []).map(normalizePhoto),
  };
};

const submitServerVotes = async ({ pollId, votes }) => {
  const participant = unwrapApiResponse(await api.post(`/votes/${pollId}/participants`, {
    deviceToken: getDeviceToken(),
  }));

  await Promise.all(votes.map((vote) => (
    api.post(`/participants/${participant.participantId}/swipes`, {
      photoId: Number(vote.photoId),
      choice: vote.value.toUpperCase(),
    })
  )));
};

export const voteService = {
  getPoll: async (pollId) => {
    const storedPoll = pollStore.find(pollId);

    if (storedPoll) {
      return storedPoll;
    }

    if (hasApiBaseUrl && isNumericId(pollId)) {
      try {
        const serverPoll = await fetchServerPoll(pollId);

        if (serverPoll.photos.length) {
          return serverPoll;
        }
      } catch (error) {
        console.warn("서버 투표 정보를 불러오지 못해 데모 투표로 전환합니다.", error);
      }
    }

    return {
      ...demoPoll,
      id: String(pollId),
    };
  },

  submit: async ({ pollId, votes }) => {
    if (
      hasApiBaseUrl
      && isNumericId(pollId)
      && votes.every((vote) => isNumericId(vote.photoId))
    ) {
      try {
        await submitServerVotes({ pollId, votes });
      } catch (error) {
        console.warn("서버 투표 제출에 실패했지만 로컬 완료 상태를 유지합니다.", error);
      }
    }

    return {
      ok: true,
      pollId,
      submittedCount: votes.length,
      submittedAt: new Date().toISOString(),
    };
  },
};
