import { useState } from 'react';
import { pollService } from '../services/pollService';

export function usePoll() {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  const createPoll = async (poll) => {
    setIsCreating(true);
    setError('');

    try {
      return await pollService.create(poll);
    } catch (error) {
      console.error('투표 생성 실패', error);
      setError('투표 생성 중 문제가 발생했어요.');
      return { ok: false };
    } finally {
      setIsCreating(false);
    }
  };

  return {
    createPoll,
    isCreating,
    error,
  };
}
