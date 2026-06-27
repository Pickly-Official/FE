import { Link } from 'react-router-dom';

const spots = [
  { name: '서울숲', rate: '92%', tags: ['감성', '초록', '햇살'] },
  { name: '성수 카페거리', rate: '88%', tags: ['카페', '인물'] },
  { name: '한강공원', rate: '84%', tags: ['야경', '피크닉'] },
];

const activePolls = [
  { id: 'demo', title: '프로필 사진 골라줘', status: '마감까지 2일', count: 12 },
  { id: 'cafe', title: '카페 업로드 사진', status: '마감까지 6시간', count: 9 },
];

const closedPolls = [
  { id: 'summer', title: '여행 업로드 컷', status: '종료됨', count: 28 },
  { id: 'profile', title: '새 프로필 후보', status: '종료됨', count: 43 },
];

function HomePage() {
  return (
    <main className="app-canvas page-canvas">
      <header className="page-header">
        <div>
          <p className="eyebrow">Pickly</p>
          <h1>오늘의 베스트컷을 골라볼까요?</h1>
        </div>
        <Link className="profile-chip" to="/home/mypage" aria-label="마이페이지">
          P
        </Link>
      </header>

      <section className="metric-grid" aria-label="통계">
        <article className="metric-card">
          <span>누적 참여자</span>
          <strong>1,284</strong>
        </article>
        <article className="metric-card">
          <span>오늘 생성 투표</span>
          <strong>37</strong>
        </article>
      </section>

      <section className="section-block">
        <div className="section-title">
          <h2>이번 주 인기 포토스팟</h2>
          <span>TOP 3</span>
        </div>
        <div className="spot-list">
          {spots.map((spot, index) => (
            <article className="spot-card" key={spot.name}>
              <span className="rank-badge">{index + 1}</span>
              <h3>{spot.name}</h3>
              <strong>{spot.rate}</strong>
              <div>
                {spot.tags.map((tag) => (
                  <span className="tag" key={tag}>#{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <Link className="primary-cta" to="/create">
        새 투표 만들기
      </Link>

      <section className="section-block">
        <div className="section-title">
          <h2>내 투표</h2>
          <span>{activePolls.length + closedPolls.length}개</span>
        </div>
        <PollGroup title="진행중인 투표" polls={activePolls} />
        <PollGroup title="종료된 투표" polls={closedPolls} />
      </section>
    </main>
  );
}

function PollGroup({ title, polls }) {
  return (
    <section className="poll-group">
      <div className="poll-group-header">
        <h3>{title}</h3>
        <span>{polls.length}개</span>
      </div>
      <div className="poll-list">
        {polls.map((poll) => (
          <Link className="poll-item" to={`/result/${poll.id}`} key={poll.id}>
            <div>
              <strong>{poll.title}</strong>
              <span>{poll.status}</span>
            </div>
            <em>{poll.count}명</em>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default HomePage;
