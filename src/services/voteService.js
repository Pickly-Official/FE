export const voteService = {
  getPoll: async (pollId) => ({
    id: pollId,
    title: '프로필 사진 골라줘',
    owner: '도경',
    location: '서울숲',
    photos: [
      {
        id: 'cafe-window',
        label: '카페 창가 컷',
        description: '창가 빛이 자연스럽게 들어온 사진',
        tone: 'cafe',
      },
      {
        id: 'sun-front',
        label: '햇살 정면 컷',
        description: '표정과 조명이 가장 밝은 정면 사진',
        tone: 'sun',
      },
      {
        id: 'street-bg',
        label: '거리 배경 컷',
        description: '성수 골목 배경이 잘 보이는 사진',
        tone: 'street',
      },
      {
        id: 'natural-smile',
        label: '자연스러운 웃음 컷',
        description: '웃는 표정이 편안하게 나온 사진',
        tone: 'forest',
      },
    ],
  }),

  submit: async ({ pollId, votes }) => ({
    ok: true,
    pollId,
    submittedCount: votes.length,
    submittedAt: new Date().toISOString(),
  }),
};
