export const resultService = {
  getResult: async (pollId) => ({
    id: pollId,
    title: '프로필 사진 골라줘',
    location: '서울숲',
    participantCount: 28,
    closedAt: '2026-06-29T18:00:00.000Z',
    analysis: {
      title: 'AI 분석 인사이트',
      model: 'Pickly AI',
      summary: '친구들은 밝은 표정과 깔끔한 배경이 있는 사진을 더 선호했어요.',
      tags: ['자연스러움', '밝은조명', '프로필추천'],
    },
    rankings: [
      {
        id: 'sun-front',
        rank: 1,
        title: '햇살 정면 컷',
        rate: 86,
        votes: 24,
        comment: '표정이 가장 자연스럽고 조명이 안정적이에요.',
      },
      {
        id: 'cafe-window',
        rank: 2,
        title: '카페 창가 컷',
        rate: 72,
        votes: 20,
        comment: '배경 분위기가 좋고 인물 집중도가 높아요.',
      },
      {
        id: 'street-bg',
        rank: 3,
        title: '거리 배경 컷',
        rate: 58,
        votes: 16,
        comment: '구도는 좋지만 얼굴 그림자가 조금 강해요.',
      },
    ],
  }),

  getMyPolls: async () => ({
    profile: {
      name: '게스트',
      mode: '둘러보기 모드',
    },
    stats: {
      createdPolls: 6,
      receivedVotes: 128,
      bestCuts: 4,
    },
    activePolls: [
      {
        id: 'demo',
        title: '프로필 사진 골라줘',
        status: '마감까지 2일',
        count: 28,
        updatedAt: '2026-06-27T10:30:00.000Z',
      },
      {
        id: 'cafe',
        title: '카페 업로드 사진',
        status: '마감까지 6시간',
        count: 9,
        updatedAt: '2026-06-27T08:20:00.000Z',
      },
    ],
    closedPolls: [
      {
        id: 'summer',
        title: '여행 업로드 컷',
        status: '종료',
        count: 43,
        updatedAt: '2026-06-25T18:00:00.000Z',
      },
      {
        id: 'profile',
        title: '새 프로필 후보',
        status: '종료',
        count: 28,
        updatedAt: '2026-06-22T13:10:00.000Z',
      },
    ],
  }),
};
