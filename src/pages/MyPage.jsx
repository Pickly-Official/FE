import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { resultService } from '../services/resultService';
import { formatDate, formatVoteCount } from '../utils/formatDate';

function MyPage() {
  const [data, setData] = useState(null);
  const [openGroups, setOpenGroups] = useState({
    active: true,
    closed: false,
  });

  useEffect(() => {
    let isMounted = true;

    resultService.getMyPolls().then((nextData) => {
      if (isMounted) {
        setData(nextData);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleGroup = (group) => {
    setOpenGroups((current) => ({
      ...current,
      [group]: !current[group],
    }));
  };

  if (!data) {
    return (
      <main className="app-canvas page-canvas">
        <section className="done-card">
          <strong>마이페이지를 불러오는 중</strong>
          <p>내 투표 목록을 정리하고 있어요.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="app-canvas page-canvas">
      <header className="stack-header">
        <Link className="icon-button" to="/home" aria-label="홈으로">‹</Link>
        <h1>마이페이지</h1>
      </header>

      <section className="profile-card">
        <div className="avatar">P</div>
        <div>
          <strong>{data.profile.name}</strong>
          <span>{data.profile.mode}</span>
        </div>
      </section>

      <section className="metric-grid metric-grid--three">
        <article className="metric-card">
          <span>만든 투표</span>
          <strong>{data.stats.createdPolls}</strong>
        </article>
        <article className="metric-card">
          <span>받은 표</span>
          <strong>{data.stats.receivedVotes}</strong>
        </article>
        <article className="metric-card">
          <span>베스트컷</span>
          <strong>{data.stats.bestCuts}</strong>
        </article>
      </section>

      <section className="section-block">
        <div className="section-title">
          <h2>내 투표 목록</h2>
          <span>{data.activePolls.length + data.closedPolls.length}개</span>
        </div>
        <MyPollGroup
          id="active"
          title="진행중인 투표"
          polls={data.activePolls}
          isOpen={openGroups.active}
          onToggle={toggleGroup}
        />
        <MyPollGroup
          id="closed"
          title="종료된 투표"
          polls={data.closedPolls}
          isOpen={openGroups.closed}
          onToggle={toggleGroup}
        />
      </section>

      <button className="danger-button" type="button">회원 탈퇴</button>
    </main>
  );
}

function MyPollGroup({ id, title, polls, isOpen, onToggle }) {
  return (
    <section className="poll-group">
      <button
        className="poll-group-header"
        type="button"
        aria-expanded={isOpen}
        aria-controls={`${id}-mypage-poll-list`}
        onClick={() => onToggle(id)}
      >
        <span className="poll-group-title">
          <strong>{title}</strong>
          <em>{polls.length}개</em>
        </span>
        <span className={`poll-group-arrow ${isOpen ? 'is-open' : ''}`} aria-hidden="true">
          ▾
        </span>
      </button>
      {isOpen && (
        <div className="poll-list" id={`${id}-mypage-poll-list`}>
          {polls.map((poll) => (
            <Link className="poll-item poll-item--stacked" to={`/result/${poll.id}`} key={poll.id}>
              <div>
                <strong>{poll.title}</strong>
                <span>{poll.status} · {formatDate(poll.updatedAt)}</span>
              </div>
              <em>{formatVoteCount(poll.count)}</em>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default MyPage;
