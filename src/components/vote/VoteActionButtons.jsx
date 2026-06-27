function VoteActionButtons({ canUndo, onUndo, lastAction }) {
  return (
    <div className="vote-actions">
      <p className="swipe-hint">왼쪽으로 밀면 SKIP · 오른쪽으로 밀면 LIKE</p>
      <button type="button" onClick={onUndo} disabled={!canUndo}>
        되돌리기
      </button>
      {lastAction && <span>최근 선택: {lastAction === 'like' ? 'LIKE' : 'SKIP'}</span>}
    </div>
  );
}

export default VoteActionButtons;
