import { POLL_OPTIONS } from '../constants/pollOptions';

export function validatePoll(poll) {
  const errors = {};
  const title = poll?.title?.trim() ?? '';
  const photoCount = poll?.photos?.length ?? 0;

  if (!title) {
    errors.title = '투표 제목을 입력해주세요.';
  }

  if (photoCount < POLL_OPTIONS.minPhotos) {
    errors.photos = `사진을 최소 ${POLL_OPTIONS.minPhotos}장 추가해주세요.`;
  }

  if (photoCount > POLL_OPTIONS.maxPhotos) {
    errors.photos = `사진은 최대 ${POLL_OPTIONS.maxPhotos}장까지 추가할 수 있어요.`;
  }

  if (!poll?.deadlineHours) {
    errors.deadline = '마감일을 선택해주세요.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
