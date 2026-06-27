import api, { hasApiBaseUrl, unwrapApiResponse } from "./api";
import { pollStore } from "../store/pollStore";

const deadlineTypeByHours = {
  24: "H24",
  72: "D3",
  168: "D7",
};

const hasAccessToken = () => (
  typeof window !== "undefined" && Boolean(window.localStorage.getItem("accessToken"))
);

const fileToDataUrl = (file) => (
  new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  })
);

const compressImageFile = async (file) => {
  if (!file || !file.type?.startsWith("image/")) {
    return fileToDataUrl(file);
  }

  const originalDataUrl = await fileToDataUrl(file);

  return new Promise((resolve) => {
    const image = new Image();

    image.onload = () => {
      const maxSize = 960;
      const ratio = Math.min(1, maxSize / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * ratio));
      canvas.height = Math.max(1, Math.round(image.height * ratio));

      const context = canvas.getContext("2d");
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.76));
    };

    image.onerror = () => resolve(originalDataUrl);
    image.src = originalDataUrl;
  });
};

const buildStoredPhotos = async (pollPhotos, uploadedPhotos = []) => (
  Promise.all(
    pollPhotos.map(async (photo, index) => {
      const uploadedPhoto = uploadedPhotos[index];
      const imageUrl = uploadedPhoto?.imageUrl
        || (photo.file ? await compressImageFile(photo.file) : photo.previewUrl);

      return {
        id: String(uploadedPhoto?.photoId ?? photo.id),
        label: `사진 ${uploadedPhoto?.sequence ?? index + 1}`,
        description: photo.name,
        imageUrl,
      };
    }),
  )
);

const savePollMirror = async ({ poll, id, closedAt, uploadedPhotos = [] }) => {
  const createdAt = new Date().toISOString();
  const deadlineAt = closedAt
    ? new Date(closedAt).toISOString()
    : new Date(Date.now() + Number(poll.deadlineHours) * 60 * 60 * 1000).toISOString();

  const photos = await buildStoredPhotos(poll.photos, uploadedPhotos);

  return pollStore.save({
    ...poll,
    id: String(id),
    title: poll.title,
    owner: "도경",
    location: poll.location || "위치 미설정",
    photos,
    createdAt,
    deadlineAt,
    status: "active",
  });
};

const createServerPoll = async (poll) => {
  const createdVote = unwrapApiResponse(await api.post("/votes", {
    title: poll.title,
    deadlineType: deadlineTypeByHours[Number(poll.deadlineHours)] || "D3",
    useLocation: false,
  }));

  let uploadedPhotos = [];

  if (poll.photos.length) {
    const formData = new FormData();
    poll.photos.forEach((photo) => {
      if (photo.file) {
        formData.append("files", photo.file);
      }
    });

    if ([...formData.keys()].length) {
      const uploadResult = unwrapApiResponse(await api.post(
        `/votes/${createdVote.voteId}/photos`,
        formData,
        { timeout: 30000 },
      ));
      uploadedPhotos = uploadResult?.photos || [];
    }
  }

  const storedPoll = await savePollMirror({
    poll,
    id: createdVote.voteId,
    closedAt: createdVote.closedAt,
    uploadedPhotos,
  });

  return {
    ok: true,
    id: String(createdVote.voteId),
    poll: storedPoll,
  };
};

const createLocalPoll = async (poll) => {
  const id = `poll-${Date.now()}`;
  const storedPoll = await savePollMirror({ poll, id });

  return {
    ok: true,
    id,
    poll: storedPoll,
  };
};

export const pollService = {
  create: async (poll) => {
    if (hasApiBaseUrl && hasAccessToken()) {
      try {
        return await createServerPoll(poll);
      } catch (error) {
        console.warn("서버 투표 생성에 실패해 로컬 투표로 전환합니다.", error);
      }
    }

    return createLocalPoll(poll);
  },
};
