import { useEffect, useRef, useState } from 'react';

const SWIPE_THRESHOLD = 72;

function SwipeCard({ photo, photoKey, onSwipe }) {
  const [drag, setDrag] = useState({ isDragging: false, startX: 0, x: 0 });
  const [flyOut, setFlyOut] = useState(null);
  const dragRef = useRef({ isDragging: false, startX: 0, x: 0 });
  const flyOutRef = useRef(null);
  const timeoutRef = useRef(null);

  const resetDrag = () => {
    dragRef.current = { isDragging: false, startX: 0, x: 0 };
    setDrag({ isDragging: false, startX: 0, x: 0 });
    setFlyOut(null);
    flyOutRef.current = null;
  };

  useEffect(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    resetDrag();

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [photoKey, photo?.id, photo?.imageUrl, photo?.previewUrl, photo?.label]);

  const finishSwipe = (value) => {
    if (flyOutRef.current) return;

    flyOutRef.current = value;
    setFlyOut(value);
    timeoutRef.current = window.setTimeout(() => {
      onSwipe(value);
      timeoutRef.current = null;
    }, 180);
  };

  const handlePointerDown = (event) => {
    if (flyOutRef.current) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);

    const nextDrag = { isDragging: true, startX: event.clientX, x: 0 };
    dragRef.current = nextDrag;
    setDrag(nextDrag);
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current.isDragging || flyOutRef.current) return;

    event.preventDefault();
    const nextDrag = {
      ...dragRef.current,
      x: event.clientX - dragRef.current.startX,
    };
    dragRef.current = nextDrag;
    setDrag(nextDrag);
  };

  const handlePointerUp = (event) => {
    if (!dragRef.current.isDragging || flyOutRef.current) return;

    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const finalX = dragRef.current.x;

    if (finalX >= SWIPE_THRESHOLD) {
      finishSwipe('like');
      return;
    }

    if (finalX <= -SWIPE_THRESHOLD) {
      finishSwipe('skip');
      return;
    }

    resetDrag();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      finishSwipe('like');
    }

    if (event.key === 'ArrowLeft') {
      finishSwipe('skip');
    }
  };

  const dragX = flyOut === 'like' ? 360 : flyOut === 'skip' ? -360 : drag.x;
  const rotate = Math.max(Math.min(dragX / 14, 16), -16);
  const likeOpacity = Math.min(Math.max(dragX / 110, 0), 1);
  const skipOpacity = Math.min(Math.max(-dragX / 110, 0), 1);
  const imageUrl = photo?.imageUrl || photo?.previewUrl;

  return (
    <section
      className={`swipe-card ${drag.isDragging ? 'is-dragging' : ''} ${flyOut ? `is-flyout-${flyOut}` : ''}`}
      role="button"
      tabIndex={0}
      aria-label="사진 카드를 좌우로 밀어 평가"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      style={{
        transform: `translateX(${dragX}px) rotate(${rotate}deg)`,
        '--like-opacity': likeOpacity,
        '--skip-opacity': skipOpacity,
      }}
    >
      <span className="swipe-label swipe-label--skip">SKIP</span>
      <span className="swipe-label swipe-label--like">LIKE</span>
      <div className={`mock-photo ${photo.tone ? `mock-photo--${photo.tone}` : ''}`}>
        {imageUrl && <img className="swipe-photo-image" src={imageUrl} alt={photo?.label || '평가할 사진'} draggable="false" />}
        <div className="swipe-photo-caption">
          <span>{photo?.label}</span>
          <em>{photo?.description}</em>
        </div>
      </div>
    </section>
  );
}

export default SwipeCard;
