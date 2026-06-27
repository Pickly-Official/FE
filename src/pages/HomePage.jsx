import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import { ROUTES } from "../constants/routes";

const popularSpots = [
  {
    rank: 1,
    name: "성수동 서울숲",
    recommendRate: 89,
    tags: ["감성", "자연광"],
  },
  {
    rank: 2,
    name: "엔트러사이트 한남점",
    recommendRate: 78,
    tags: ["카페", "실내"],
  },
];

const activePolls = [
  {
    id: 1,
    title: "이번 주말 인스타 업로드용✨",
    description: "마감 3일 남음 · 8장",
    role: "OWNER",
  },
  {
    id: 2,
    title: "우정사진 뭐가 좋아?",
    description: "마감 1일 남음 · 7장",
    role: "VOTER",
  },
];

const closedPolls = [
  {
    id: 3,
    title: "내 졸업사진 뽑기",
    description: "총 12명 참여",
    role: "OWNER",
  },
];

function HomePage() {
  const navigate = useNavigate();

  const movePoll = (poll) => {
    if (poll.role === "OWNER") {
      navigate(`${ROUTES.RESULT}/${poll.id}`);
      return;
    }

    navigate(`${ROUTES.VOTE}/${poll.id}`);
  };

  return (
    <AppLayout headerTitle="Pickly">
      <section className="home-page">
        <div className="home-title-area">
          <p className="home-subtitle">안녕하세요 👋</p>
          <h2>
            오늘은 어떤 <span>베스트컷</span>을 찾아볼까요?
          </h2>
        </div>

        <div className="home-stats">
          <div className="home-stat-card">
            <p>누적 참여자</p>
            <strong>1,234명</strong>
          </div>

          <div className="home-stat-card">
            <p>오늘 생성 투표</p>
            <strong>83개</strong>
          </div>
        </div>

        <section className="home-popular-section">
          <h3>🔥 이번 주 인기 포토스팟</h3>

          <div className="popular-card-list">
            {popularSpots.map((spot) => (
              <article key={spot.rank} className="popular-card">
                <div className="popular-rank-badge">{spot.rank}위</div>

                <div className="popular-image-box" />

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
          <details className="home-accordion" open>
            <summary>내 진행중인 투표 ({activePolls.length})</summary>

            <div className="home-poll-list">
              {activePolls.map((poll) => (
                <button key={poll.id} type="button" onClick={() => movePoll(poll)}>
                  <div>
                    <strong>{poll.title}</strong>
                    <span>{poll.description}</span>
                  </div>
                  <em>›</em>
                </button>
              ))}
            </div>
          </details>

          <details className="home-accordion">
            <summary>내 종료된 투표 ({closedPolls.length})</summary>

            <div className="home-poll-list">
              {closedPolls.map((poll) => (
                <button key={poll.id} type="button" onClick={() => movePoll(poll)}>
                  <div>
                    <strong>{poll.title}</strong>
                    <span>{poll.description}</span>
                  </div>
                  <em>›</em>
                </button>
              ))}
            </div>
          </details>
        </section>
      </section>
    </AppLayout>
  );
}

export default HomePage;