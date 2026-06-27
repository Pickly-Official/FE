import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import Loading from "../components/common/Loading";
import { ROUTES } from "../constants/routes";
import { useHome } from "../hooks/useHome";

function HomePage() {
  const navigate = useNavigate();
  const { homeData, isLoading, errorMessage } = useHome();

  const { statistics, popularSpots, activePolls, closedPolls } = homeData;

  const movePoll = (poll) => {
    if (poll.role === "OWNER") {
      navigate(`${ROUTES.RESULT.replace(":id", poll.id)}`);
      return;
    }

    navigate(`${ROUTES.VOTE.replace(":id", poll.id)}`);
  };

  if (isLoading) {
    return (
      <AppLayout headerTitle="Pickly">
        <Loading text="홈 데이터를 불러오는 중..." />
      </AppLayout>
    );
  }

  return (
    <AppLayout headerTitle="Pickly">
      <section className="home-screen">
        <div className="hero-copy">
          <p className="eyebrow">친구들의 반응으로</p>
          <h1>
            오늘은 어떤
            <br />
            <span>베스트컷</span>을 찾아볼까요?
          </h1>
        </div>

        {errorMessage && <p className="home-error-message">{errorMessage}</p>}

        <div className="metric-grid">
          <div className="metric-card">
            <span>누적 참여자</span>
            <strong>{statistics?.totalParticipants || "-"}</strong>
          </div>

          <div className="metric-card">
            <span>오늘 생성 투표</span>
            <strong>{statistics?.todayPolls || "-"}</strong>
          </div>
        </div>

        <section className="section-block">
          <div className="section-title">
            <h2>이번 주 인기 포토스팟</h2>
            <span>추천율 기준</span>
          </div>

          <div className="spot-list">
            {popularSpots.map((spot, index) => (
              <article key={spot.id} className="spot-card">
                <div className={`spot-photo ${index === 1 ? 'spot-photo--cafe' : 'spot-photo--forest'}`}>
                  <div className="rank-badge">{spot.rank}</div>
                </div>

                <div className="spot-card-body">
                  <h3>{spot.name}</h3>
                  <strong>{spot.recommendRate}%</strong>
                  <div>
                    {(spot.tags || []).map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <button type="button" className="primary-cta" onClick={() => navigate(ROUTES.CREATE)}>
          새 투표 만들기
        </button>

        <section className="section-block">
          <PollGroup title="내 진행중인 투표" polls={activePolls} defaultOpen onMovePoll={movePoll} />

          <PollGroup title="내 종료된 투표" polls={closedPolls} onMovePoll={movePoll} />
        </section>
      </section>
    </AppLayout>
  );
}

function PollGroup({ title, polls, defaultOpen = false, onMovePoll }) {
  return (
    <details className="poll-group" open={defaultOpen}>
      <summary className="poll-group-header">
        <span className="poll-group-title">
          <strong>{title}</strong>
          <em>{polls.length}개</em>
        </span>
        <span className="poll-group-arrow">⌄</span>
      </summary>

      <div className="poll-list">
        {polls.map((poll) => (
          <button key={poll.id} className="poll-item" type="button" onClick={() => onMovePoll(poll)}>
            <div>
              <strong>{poll.title}</strong>
              <span>{poll.description}</span>
            </div>
            <em>›</em>
          </button>
        ))}
      </div>
    </details>
  );
}

export default HomePage;
