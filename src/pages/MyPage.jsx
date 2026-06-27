import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PicklyTopBar from '../components/common/PicklyTopBar';
import { resultService } from '../services/resultService';
import { formatDate, formatVoteCount } from '../utils/formatDate';

function MyPage() {
  const [data, setData] = useState(null);

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

  if (!data) {
    return (
      <main className="app-canvas page-canvas mypage-canvas">
        <section className="done-card">
          <strong>마이페이지를 불러오는 중</strong>
          <p>내 투표 목록을 정리하고 있어요.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="app-canvas mypage-canvas">
      <PicklyTopBar active="mypage" />

      <section className="mypage-profile-card">
        <div className="mypage-avatar">J</div>
        <div className="mypage-profile-copy">
          <strong>{data.profile.name}</strong>
          <span>{data.profile.mode}</span>
        </div>
      </section>

      <section className="mypage-stat-grid" aria-label="내 활동 요약">
        <article className="mypage-stat-card">
          <strong>{data.stats.createdPolls}</strong>
          <span>만든 투표</span>
        </article>
        <article className="mypage-stat-card">
          <strong>{data.stats.receivedVotes}</strong>
          <span>받은 투표</span>
        </article>
      </section>

      <MyPollGroup
        id="active"
        className="mypage-group--active"
        title="진행중인 투표"
        polls={data.activePolls}
      />
      <MyPollGroup
        id="closed"
        className="mypage-group--closed"
        title="종료된 투표"
        polls={data.closedPolls}
      />

      <button className="mypage-danger-button" type="button">회원 탈퇴</button>
    </main>
  );
}

function MyPollGroup({ id, className = '', title, polls }) {
  return (
    <section className={`mypage-poll-group ${className}`}>
      <h2>{title}</h2>
      <div className="mypage-poll-list" id={`${id}-mypage-poll-list`}>
        {polls.map((poll) => (
          <Link className="mypage-poll-item" to={`/result/${poll.id}`} key={poll.id}>
            <div>
              <strong>{poll.title}</strong>
              <span>{poll.status} · {formatDate(poll.updatedAt)}</span>
            </div>
            <em>{formatVoteCount(poll.count)}</em>
            <span className="mypage-poll-item-arrow" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default MyPage;
