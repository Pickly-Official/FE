import { useRef } from 'react';
import { POLL_OPTIONS } from '../../constants/pollOptions';

function PhotoGrid({
  photos,
  onAddPhotos,
  onRemovePhoto,
  onComplete,
  onEditPhotos,
  isProcessing = false,
  isComplete = false,
  maxPhotos = POLL_OPTIONS.maxPhotos,
  error = '',
}) {
  const inputRef = useRef(null);
  const canAddMore = photos.length < maxPhotos && !isProcessing && !isComplete;
  const hasEnoughPhotos = photos.length >= POLL_OPTIONS.minPhotos;
  const isLocked = isProcessing || isComplete;

  const handleFileChange = (event) => {
    onAddPhotos(event.target.files);
    event.target.value = '';
  };

  return (
    <section className={`section-block ${error ? 'is-error' : ''}`}>
      <div className="section-title">
        <h2>사진 업로드</h2>
        <span>{photos.length} / {maxPhotos}</span>
      </div>

      <div className="photo-grid">
        {photos.map((photo, index) => (
          <article className="photo-tile photo-tile--preview" key={photo.id}>
            <img src={photo.previewUrl} alt={`업로드 사진 ${index + 1}`} />
            <span>{index + 1}</span>
            {!isLocked && (
              <button type="button" onClick={() => onRemovePhoto(photo.id)} aria-label={`${index + 1}번 사진 삭제`}>
                ×
              </button>
            )}
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

      <ol className="photo-workflow" aria-label="사진 업로드 진행 단계">
        <li className={photos.length > 0 ? 'is-active' : ''}>
          <span>1</span>
          사진 추가
        </li>
        <li className={isProcessing ? 'is-active' : isComplete ? 'is-done' : hasEnoughPhotos ? 'is-ready' : ''}>
          <span>2</span>
          위치 분석
        </li>
        <li className={isComplete ? 'is-active' : ''}>
          <span>3</span>
          위치 확인
        </li>
      </ol>

      <button
        className={`photo-complete-button ${isComplete ? 'is-complete' : ''}`}
        type="button"
        onClick={onComplete}
        disabled={isProcessing || isComplete || !hasEnoughPhotos}
      >
        {isProcessing ? '위치 분석 중' : isComplete ? '위치 확인 완료' : '완료'}
      </button>

      {isComplete && (
        <button className="photo-edit-button" type="button" onClick={onEditPhotos}>
          사진 다시 수정
        </button>
      )}

      <p className="helper-copy">
        {isComplete
          ? '위치 정보가 준비됐어요. 아래에서 확인하고 투표를 생성하세요.'
          : hasEnoughPhotos
            ? '완료를 누르면 백엔드에서 사진 위치 정보를 분석해요.'
            : `사진을 최소 ${POLL_OPTIONS.minPhotos}장 추가하면 위치 분석을 시작할 수 있어요.`}
      </p>
    </section>
  );
}

export default PhotoGrid;
