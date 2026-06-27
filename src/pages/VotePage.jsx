import { useState } from 'react';
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
  const current = votePhotos[index];
  const isDone = index >= votePhotos.length;

  const submitVote = (value) => {
    if (isDone) return;
    setHistory((prev) => [...prev, { photoId: current.id, value }]);
    setIndex((prev) => prev + 1);
  };

  const undo = () => {
    setHistory((prev) => prev.slice(0, -1));
    setIndex((prev) => Math.max(prev - 1, 0));
  };

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
          <section className="swipe-card">
            <span className="like-label">LIKE</span>
            <div className="mock-photo">{current.label}</div>
          </section>

          <div className="vote-actions">
            <button type="button" onClick={() => submitVote('skip')}>별로</button>
            <button type="button" onClick={undo} disabled={history.length === 0}>되돌리기</button>
            <button type="button" onClick={() => submitVote('like')}>좋음</button>
          </div>
        </>
      )}
    </main>
  );
}

export default VotePage;
