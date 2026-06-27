import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import { ROUTES } from "../constants/routes";

const popularSpots = [
  {
    rank: 1,
    name: "성수동 서울숲",
    recommendRate: 89,
    tags: ["감성", "자연광", "데이트"],
  },
  {
    rank: 2,
    name: "한강공원",
    recommendRate: 82,
    tags: ["노을", "야경", "산책"],
  },
  {
    rank: 3,
    name: "경복궁",
    recommendRate: 76,
    tags: ["전통", "여행", "한복"],
  },
];

const activePolls = [
  {
    id: 1,
    title: "이번 주말 인스타 업로드용",
    role: "OWNER",
  },
  {
    id: 2,
    title: "프로필 사진 뭐가 나아?",
    role: "VOTER",
  },
];

const closedPolls = [
  {
    id: 3,
    title: "서울숲 베스트컷 고르기",
    role: "OWNER",
  },
  {
    id: 4,
    title: "여행 사진 골라줘",
    role: "OWNER",
  },
  {
    id: 5,
    title: "카페 사진 투표",
    role: "VOTER",
  },
  {
    id: 6,
    title: "야경 사진 추천",
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
        <div className="home-greeting">
          <p>안녕하세요 👋</p>
          <h2>오늘은 어떤 베스트컷을 찾아볼까요?</h2>
        </div>

        <div className="home-stats">
          <Card className="home-stat-card">
            <p>누적 참여자</p>
            <strong>1,234명</strong>
          </Card>

          <Card className="home-stat-card">
            <p>오늘 생성 투표</p>
            <strong>12개</strong>
          </Card>
        </div>

        <section className="home-section">
          <h3>🔥 이번 주 인기 포토스팟</h3>

          <div className="popular-spot-list">
            {popularSpots.map((spot) => (
              <Card key={spot.rank} className="popular-spot-card">
                <div className="popular-spot-header">
                  <strong>
                    {spot.rank}위. {spot.name}
                  </strong>
                  <span>추천율 {spot.recommendRate}%</span>
                </div>

                <div className="popular-spot-tags">
                  {spot.tags.map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <Button
          variant="primary"
          size="large"
          fullWidth
          className="home-create-button"
          onClick={() => navigate(ROUTES.CREATE)}
        >
          + 새 투표 만들기
        </Button>

        <section className="home-section">
          <details className="home-accordion" open>
            <summary>내 진행중인 투표 ({activePolls.length}개)</summary>

            <div className="home-poll-list">
              {activePolls.map((poll) => (
                <button key={poll.id} type="button" onClick={() => movePoll(poll)}>
                  {poll.title}
                </button>
              ))}
            </div>
          </details>

          <details className="home-accordion">
            <summary>내 종료된 투표 ({closedPolls.length}개)</summary>

            <div className="home-poll-list">
              {closedPolls.map((poll) => (
                <button key={poll.id} type="button" onClick={() => movePoll(poll)}>
                  {poll.title}
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