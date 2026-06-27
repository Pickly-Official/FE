import { pollStore } from '../store/pollStore';

const fileToDataUrl = (file) => (
  new Promise((resolve, reject) => {
    if (!file) {
      resolve('');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  })
);

export const pollService = {
  create: async (poll) => {
    const id = `poll-${Date.now()}`;
    const createdAt = new Date().toISOString();
    const deadlineAt = new Date(Date.now() + Number(poll.deadlineHours) * 60 * 60 * 1000).toISOString();

    const photos = await Promise.all(
      poll.photos.map(async (photo, index) => {
        const imageUrl = photo.file ? await fileToDataUrl(photo.file) : photo.previewUrl;

        return {
          id: photo.id,
          label: `사진 ${index + 1}`,
          description: photo.name,
          imageUrl,
        };
      }),
    );

    const storedPoll = pollStore.save({
      ...poll,
      id,
      title: poll.title,
      owner: '도경',
      location: poll.location || '위치 미설정',
      photos,
      createdAt,
      deadlineAt,
      status: 'active',
    });

    return {
      ok: true,
      id,
      poll: storedPoll,
    };
  },
};
