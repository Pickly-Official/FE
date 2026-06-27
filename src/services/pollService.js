export const pollService = {
  create: async (poll) => {
    const id = `poll-${Date.now()}`;

    return {
      ok: true,
      id,
      poll: {
        ...poll,
        id,
        createdAt: new Date().toISOString(),
      },
    };
  },
};
