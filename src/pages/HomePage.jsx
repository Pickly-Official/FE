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
      <section className="home-page">
        <div className="home-title-area">
          <p className="home-subtitle">안녕하세요 👋</p>
          <h2>
            오늘은 어떤 <span>베스트컷</span>을 찾아볼까요?
          </h2>
        </div>

        {errorMessage && <p className="home-error-message">{errorMessage}</p>}

        <div className="home-stats">
          <div className="home-stat-card">
            <p>누적 참여자</p>
            <strong>{statistics?.totalParticipants || "-"}</strong>
          </div>

          <div className="home-stat-card">
            <p>오늘 생성 투표</p>
            <strong>{statistics?.todayPolls || "-"}</strong>
          </div>
        </div>

        <section className="home-popular-section">
          <h3>🔥 이번 주 인기 포토스팟</h3>

          <div className="popular-card-list">
            {popularSpots.map((spot) => (
              <article key={spot.id} className="popular-card">
                <div className="popular-rank-badge">{spot.rank}위</div>

                {spot.imageUrl ? (
                  <img className="popular-image-box" src={spot.imageUrl} alt={spot.name} />
                ) : (
                  <div className="popular-image-box" />
                )}

                <div className="popular-info">
                  <strong>{spot.name}</strong>
                  <span>추천율 {spot.recommendRate}%</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <button type="button" className="home-create-button" onClick={() => navigate(ROUTES.CREATE)}>
          📸 새 투표 만들기
        </button>

        <section className="home-accordion-section">
          <PollGroup title="내 진행중인 투표" polls={activePolls} defaultOpen onMovePoll={movePoll} />

          <PollGroup title="내 종료된 투표" polls={closedPolls} onMovePoll={movePoll} />
        </section>
      </section>
    </AppLayout>
  );
}

function PollGroup({ title, polls, defaultOpen = false, onMovePoll }) {
  return (
    <details className="home-accordion" open={defaultOpen}>
      <summary>
        {title} ({polls.length})
      </summary>

      <div className="home-poll-list">
        {polls.map((poll) => (
          <button key={poll.id} type="button" onClick={() => onMovePoll(poll)}>
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