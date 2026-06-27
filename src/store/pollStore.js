const STORAGE_KEY = 'pickly.polls';

const memoryPolls = new Map();

const canUseStorage = () => typeof window !== 'undefined' && window.localStorage;

const readStoredPolls = () => {
  if (!canUseStorage()) {
    return [];
  }

  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

const writeStoredPolls = (polls) => {
  if (!canUseStorage()) {
    return false;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(polls));
    return true;
  } catch (error) {
    console.warn('투표를 브라우저 저장소에 저장하지 못했습니다.', error);
    return false;
  }
};

export const pollStore = {
  save(poll) {
    const normalizedPoll = {
      ...poll,
      id: String(poll.id),
    };

    memoryPolls.set(normalizedPoll.id, normalizedPoll);

    const storedPolls = readStoredPolls().filter((item) => String(item.id) !== normalizedPoll.id);
    writeStoredPolls([normalizedPoll, ...storedPolls]);

    return normalizedPoll;
  },

  find(pollId) {
    const id = String(pollId);

    if (memoryPolls.has(id)) {
      return memoryPolls.get(id);
    }

    const storedPoll = readStoredPolls().find((item) => String(item.id) === id);

    if (storedPoll) {
      memoryPolls.set(id, storedPoll);
    }

    return storedPoll ?? null;
  },

  all() {
    const storedPolls = readStoredPolls();
    storedPolls.forEach((poll) => memoryPolls.set(String(poll.id), poll));
    return storedPolls;
  },
};
