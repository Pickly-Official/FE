import { useRef } from 'react';
import { POLL_OPTIONS } from '../../constants/pollOptions';

function PhotoGrid({
  photos,
  onAddPhotos,
  onRemovePhoto,
  onComplete,
  isProcessing = false,
  isComplete = false,
  maxPhotos = POLL_OPTIONS.maxPhotos,
  error = '',
}) {
  const inputRef = useRef(null);
  const canAddMore = photos.length < maxPhotos;

  const handleFileChange = (event) => {
    onAddPhotos(event.target.files);
    event.target.value = '';
  };

  return (
    <section className="section-block">
      <div className="section-title">
        <h2>사진 업로드</h2>
        <span>{photos.length} / {maxPhotos}</span>
      </div>

      <div className="photo-grid">
        {photos.map((photo, index) => (
          <article className="photo-tile photo-tile--preview" key={photo.id}>
            <img src={photo.previewUrl} alt={`업로드 사진 ${index + 1}`} />
            <span>{index + 1}</span>
            <button type="button" onClick={() => onRemovePhoto(photo.id)} aria-label={`${index + 1}번 사진 삭제`}>
              ×
            </button>
          </article>
        ))}

        {canAddMore && (
          <button className="photo-tile photo-tile--add" type="button" onClick={() => inputRef.current?.click()}>
            +
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        className="visually-hidden"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />

      {error && <p className="form-error">{error}</p>}
      <button
        className={`photo-complete-button ${isComplete ? 'is-complete' : ''}`}
        type="button"
        onClick={onComplete}
        disabled={isProcessing || photos.length < POLL_OPTIONS.minPhotos}
      >
        {isProcessing ? '처리 중' : isComplete ? '완료됨' : '완료'}
      </button>
      <p className="helper-copy">사진 업로드 후 완료를 누르면 위치 정보가 분석돼요.</p>
    </section>
  );
}

export default PhotoGrid;
