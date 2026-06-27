import api, { hasApiBaseUrl, unwrapApiResponse } from "./api";

const formatPhotoSequences = (sequences = []) => (
  sequences
    .slice()
    .sort((a, b) => a - b)
    .map((sequence) => `${sequence}번`)
    .join(", ")
);

export const analyzePhotoLocations = async (photos) => {
  if (!hasApiBaseUrl) {
    throw new Error("위치 분석 API가 설정되지 않았습니다.");
  }

  const formData = new FormData();
  photos.forEach((photo) => {
    if (photo.file) {
      formData.append("files", photo.file);
    }
  });

  const result = unwrapApiResponse(await api.post("/photos/locations", formData, {
    timeout: 30000,
  }));

  const groups = (result?.groups || []).map((group, index) => ({
    name: group.name || `위치 ${index + 1}`,
    photos: formatPhotoSequences(group.sequences),
    sequences: group.sequences || [],
    latitude: group.latitude,
    longitude: group.longitude,
  }));

  return {
    groups,
    missingGpsSequences: result?.missingGpsSequences || [],
  };
};
