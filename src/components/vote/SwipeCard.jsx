import { useEffect, useRef, useState } from 'react';

const SWIPE_THRESHOLD = 48;     // 거리 임계값 (px)
const VELOCITY_THRESHOLD = 0.35; // 속도 임계값 (px/ms) — 빠르게 짧게 밀어도 인식
const VELOCITY_MIN_DIST = 20;   // 속도 인식 최소 이동거리 (px)

function SwipeCard({ photo, photoKey, onSwipe, onDragChange }) {
  const [drag, setDrag] = useState({ isDragging: false, startX: 0, x: 0, startTime: 0 });
  const [flyOut, setFlyOut] = useState(null);
  const dragRef = useRef({ isDragging: false, startX: 0, x: 0, startTime: 0 });
  const flyOutRef = useRef(null);
  const timeoutRef = useRef(null);
  const finishSwipeRef = useRef(null);

  const resetDrag = () => {
    dragRef.current = { isDragging: false, startX: 0, x: 0, startTime: 0 };
    setDrag({ isDragging: false, startX: 0, x: 0, startTime: 0 });
    setFlyOut(null);
    flyOutRef.current = null;
    onDragChange?.(0);
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
  }, [photoKey]);

  const finishSwipe = (value) => {
    if (flyOutRef.current) return;

    flyOutRef.current = value;
    setFlyOut(value);
    onDragChange?.(value === 'like' ? 360 : -360);
    timeoutRef.current = window.setTimeout(() => {
      onSwipe(value);
      timeoutRef.current = null;
    }, 180);
  };

  // 전역 방향키 처리 — 포커스 없이도 작동하도록 ref 경유
  finishSwipeRef.current = finishSwipe;
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') finishSwipeRef.current?.('like');
      if (e.key === 'ArrowLeft') finishSwipeRef.current?.('skip');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handlePointerDown = (event) => {
    if (flyOutRef.current) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);

    const nextDrag = { isDragging: true, startX: event.clientX, x: 0, startTime: Date.now() };
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
    onDragChange?.(nextDrag.x);
  };

  const handlePointerUp = (event) => {
    if (!dragRef.current.isDragging || flyOutRef.current) return;

    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const finalX = dragRef.current.x;
    const elapsed = Date.now() - dragRef.current.startTime;
    const velocity = elapsed > 0 ? finalX / elapsed : 0;

    const byDistance = Math.abs(finalX) >= SWIPE_THRESHOLD;
    const byVelocity = Math.abs(velocity) >= VELOCITY_THRESHOLD && Math.abs(finalX) >= VELOCITY_MIN_DIST;

    if (byDistance || byVelocity) {
      finishSwipe(finalX > 0 ? 'like' : 'skip');
      return;
    }

    resetDrag();
  };

  const dragX = flyOut === 'like' ? 360 : flyOut === 'skip' ? -360 : drag.x;
  const rotate = Math.max(Math.min(dragX / 14, 16), -16);
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
      style={{
        transform: `translateX(${dragX}px) rotate(${rotate}deg)`,
      }}
    >
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
