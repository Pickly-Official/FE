import { Link, useParams } from 'react-router-dom';
import SwipeCard from '../components/vote/SwipeCard';
import VoteActionButtons from '../components/vote/VoteActionButtons';
import VoteProgress from '../components/vote/VoteProgress';
import { useVote } from '../hooks/useVote';

function VotePage() {
  const { id = 'demo' } = useParams();
  const {
    poll,
    photos,
    currentPhoto,
    currentIndex,
    progress,
    votes,
    isDone,
    isSubmitting,
    submitResult,
    submitVote,
    undo,
  } = useVote(id);

  if (!poll) {
    return (
      <main className="app-canvas page-canvas vote-canvas">
        <section className="done-card">
          <strong>투표를 불러오는 중</strong>
          <p>사진 목록을 준비하고 있어요.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="app-canvas page-canvas vote-canvas">
      <header className="stack-header">
        <Link className="icon-button" to="/home" aria-label="홈으로">‹</Link>
        <div>
          <h1>{poll.title}</h1>
          <span>{poll.owner} · {poll.location}</span>
        </div>
      </header>

      <VoteProgress current={currentIndex} total={photos.length} progress={progress} />

      {isDone ? (
        <div className="completion-backdrop" role="dialog" aria-modal="true" aria-labelledby="vote-complete-title">
          <section className="completion-modal">
            <strong id="vote-complete-title">투표 완료</strong>
            <p>
              {isSubmitting ? '평가를 저장하고 있어요.' : `${submitResult?.submittedCount ?? votes.length}장의 평가가 저장됐어요.`}
            </p>
            <button className="undo-complete-button" type="button" onClick={undo} disabled={isSubmitting}>
              마지막 선택 되돌리기
            </button>
            <Link className="primary-cta" to={`/result/${id}`}>결과 보기</Link>
            <Link className="text-link" to="/home">홈으로 이동</Link>
          </section>
        </div>
      ) : (
        <>
          <SwipeCard key={currentPhoto?.id} photo={currentPhoto} onSwipe={submitVote} />
          <VoteActionButtons
            canUndo={votes.length > 0}
            onUndo={undo}
            lastAction={votes[votes.length - 1]?.value}
          />
        </>
      )}
    </main>
  );
}

export default VotePage;
