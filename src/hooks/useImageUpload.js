import { useEffect, useRef, useState } from 'react';
import { POLL_OPTIONS } from '../constants/pollOptions';

export function useImageUpload(maxPhotos = POLL_OPTIONS.maxPhotos) {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState('');
  const urlsRef = useRef(new Set());

  useEffect(() => (
    () => {
      urlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      urlsRef.current.clear();
    }
  ), []);

  const addPhotos = (fileList) => {
    const files = Array.from(fileList ?? []).filter((file) => file.type.startsWith('image/'));

    if (files.length === 0) {
      setError('이미지 파일만 업로드할 수 있어요.');
      return;
    }

    setPhotos((current) => {
      const remainingSlots = maxPhotos - current.length;

      if (remainingSlots <= 0) {
        setError(`사진은 최대 ${maxPhotos}장까지 추가할 수 있어요.`);
        return current;
      }

      const nextFiles = files.slice(0, remainingSlots).map((file) => {
        const previewUrl = URL.createObjectURL(file);
        urlsRef.current.add(previewUrl);

        return {
          id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
          file,
          name: file.name,
          previewUrl,
          size: file.size,
        };
      });

      if (files.length > remainingSlots) {
        setError(`사진은 최대 ${maxPhotos}장까지 추가할 수 있어요.`);
      } else {
        setError('');
      }

      return [...current, ...nextFiles];
    });
  };

  const removePhoto = (photoId) => {
    setPhotos((current) => {
      const target = current.find((photo) => photo.id === photoId);

      if (target) {
        URL.revokeObjectURL(target.previewUrl);
        urlsRef.current.delete(target.previewUrl);
      }

      return current.filter((photo) => photo.id !== photoId);
    });
    setError('');
  };

  const resetPhotos = () => {
    urlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    urlsRef.current.clear();
    setPhotos([]);
    setError('');
  };

  return {
    photos,
    addPhotos,
    removePhoto,
    resetPhotos,
    error,
    isMaxReached: photos.length >= maxPhotos,
  };
}
