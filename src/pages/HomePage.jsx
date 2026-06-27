import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import Loading from "../components/common/Loading";
import { ROUTES } from "../constants/routes";
import { useHome } from "../hooks/useHome";

function HomePage() {
  const navigate = useNavigate();
  const [selectedSpot, setSelectedSpot] = useState(null);
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
            오늘의
            <br />
            <span>베스트컷</span>을 찾아보세요
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
              <button key={spot.id} className="spot-card" type="button" onClick={() => setSelectedSpot(spot)}>
                <div className={`spot-photo spot-photo--${spot.tone || (index === 1 ? 'cafe' : 'forest')}`}>
                  {spot.imageUrl && <img src={spot.imageUrl} alt="" />}
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
              </button>
            ))}
          </div>
        </section>

        <button type="button" className="primary-cta" onClick={() => navigate(ROUTES.CREATE)}>
          새 투표 만들기
        </button>

        <section className="section-block">
          <PollGroup title="내 진행중인 투표" status="active" polls={activePolls} onMovePoll={movePoll} />

          <PollGroup title="내 종료된 투표" status="closed" polls={closedPolls} onMovePoll={movePoll} />
        </section>
      </section>

      {selectedSpot && (
        <SpotPreviewModal spot={selectedSpot} onClose={() => setSelectedSpot(null)} />
      )}
    </AppLayout>
  );
}

function SpotPreviewModal({ spot, onClose }) {
  return (
    <div className="spot-preview-backdrop" role="dialog" aria-modal="true" aria-label={`${spot.name} 사진`}>
      <button className="spot-preview-backdrop__close" type="button" onClick={onClose} aria-label="닫기" />
      <section className="spot-preview-modal">
        <div className={`spot-preview-image spot-photo--${spot.tone || 'forest'}`}>
          {spot.imageUrl && <img src={spot.imageUrl} alt={spot.name} />}
        </div>
        <div className="spot-preview-caption">
          <strong>{spot.name}</strong>
          <span>{spot.recommendRate}% 추천</span>
        </div>
      </section>
    </div>
  );
}

function PollGroup({ title, status, polls, defaultOpen = false, onMovePoll }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const statusLabel = status === 'active' ? '진행중' : '종료';

  return (
    <section className={`poll-group poll-group--${status}${isOpen ? ' poll-group--open' : ''}`}>
      <button
        className="poll-group-header"
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="poll-group-title">
          <span className="poll-group-status">{statusLabel}</span>
          <strong>{title}</strong>
          <em>{polls.length}개</em>
        </span>
        <span className="poll-group-arrow" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="poll-list">
          {polls.length > 0 ? (
            polls.map((poll) => (
              <button key={poll.id} className="poll-item" type="button" onClick={() => onMovePoll(poll)}>
                <div>
                  <strong>{poll.title}</strong>
                  <span>{poll.description}</span>
                </div>
                <em>›</em>
              </button>
            ))
          ) : (
            <p className="poll-empty">아직 표시할 투표가 없어요.</p>
          )}
        </div>
      )}
    </section>
  );
}

export default HomePage;
