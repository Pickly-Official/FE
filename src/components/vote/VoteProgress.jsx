function VoteProgress({ current, total, progress }) {
  return (
    <section className="vote-progress" aria-label="투표 진행률">
      <div className="vote-progress__meta">
        <span>진행률</span>
        <strong>{Math.min(current + 1, total)} / {total}</strong>
      </div>
      <div className="progress-track">
        <span style={{ width: `${progress}%` }} />
      </div>
    </section>
  );
}

export default VoteProgress;
