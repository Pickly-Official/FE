import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const votePhotos = [
  { id: 1, label: '카페 창가 컷' },
  { id: 2, label: '햇살 정면 컷' },
  { id: 3, label: '거리 배경 컷' },
  { id: 4, label: '자연스러운 웃음 컷' },
];

function VotePage() {
  const { id = 'demo' } = useParams();
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState([]);
  const [drag, setDrag] = useState({ isDragging: false, startX: 0, x: 0 });
  const [flyOut, setFlyOut] = useState(null);
  const dragRef = useRef({ isDragging: false, startX: 0, x: 0 });
  const current = votePhotos[index];
  const isDone = index >= votePhotos.length;

  const submitVote = (value) => {
    if (isDone) return;
    setHistory((prev) => [...prev, { photoId: current.id, value }]);
    setIndex((prev) => prev + 1);
  };

  const undo = () => {
    dragRef.current = { isDragging: false, startX: 0, x: 0 };
    setDrag({ isDragging: false, startX: 0, x: 0 });
    setFlyOut(null);
    setHistory((prev) => prev.slice(0, -1));
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  const finishSwipe = (value) => {
    if (isDone || flyOut) return;
    setFlyOut(value);
    window.setTimeout(() => {
      submitVote(value);
      dragRef.current = { isDragging: false, startX: 0, x: 0 };
      setDrag({ isDragging: false, startX: 0, x: 0 });
      setFlyOut(null);
    }, 180);
  };

  const handlePointerDown = (event) => {
    if (isDone || flyOut) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    const nextDrag = { isDragging: true, startX: event.clientX, x: 0 };
    dragRef.current = nextDrag;
    setDrag(nextDrag);
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current.isDragging || flyOut) return;
    event.preventDefault();
    const nextDrag = {
      ...dragRef.current,
      x: event.clientX - dragRef.current.startX,
    };
    dragRef.current = nextDrag;
    setDrag(nextDrag);
  };

  const handlePointerUp = (event) => {
    if (!dragRef.current.isDragging || flyOut) return;

    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const finalX = dragRef.current.x;

    if (finalX >= 72) {
      finishSwipe('like');
      return;
    }

    if (finalX <= -72) {
      finishSwipe('skip');
      return;
    }

    dragRef.current = { isDragging: false, startX: 0, x: 0 };
    setDrag({ isDragging: false, startX: 0, x: 0 });
  };

  const handleCardKeyDown = (event) => {
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

  return (
    <main className="app-canvas page-canvas vote-canvas">
      <header className="stack-header">
        <Link className="icon-button" to="/home" aria-label="홈으로">‹</Link>
        <div>
          <h1>프로필 사진 골라줘</h1>
          <span>{Math.min(index + 1, votePhotos.length)} / {votePhotos.length}</span>
        </div>
      </header>

      <div className="progress-track">
        <span style={{ width: `${(index / votePhotos.length) * 100}%` }} />
      </div>

      {isDone ? (
        <section className="done-card">
          <strong>투표 완료</strong>
          <p>{history.length}장의 평가가 저장됐어요.</p>
          <Link className="primary-cta" to={`/result/${id}`}>결과 보기</Link>
        </section>
      ) : (
        <>
          <section
            className={`swipe-card ${drag.isDragging ? 'is-dragging' : ''} ${flyOut ? `is-flyout-${flyOut}` : ''}`}
            role="button"
            tabIndex={0}
            aria-label="사진 카드를 좌우로 밀어 평가"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onKeyDown={handleCardKeyDown}
            style={{
              transform: `translateX(${dragX}px) rotate(${rotate}deg)`,
              '--like-opacity': likeOpacity,
              '--skip-opacity': skipOpacity,
            }}
          >
            <span className="swipe-label swipe-label--skip">SKIP</span>
            <span className="swipe-label swipe-label--like">LIKE</span>
            <div className="mock-photo">{current.label}</div>
          </section>

          <p className="swipe-hint">왼쪽으로 밀면 SKIP · 오른쪽으로 밀면 LIKE</p>

          <div className="undo-action">
            <button type="button" onClick={undo} disabled={history.length === 0}>되돌리기</button>
          </div>
        </>
      )}
    </main>
  );
}

export default VotePage;
