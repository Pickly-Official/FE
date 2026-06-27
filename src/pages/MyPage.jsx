import { Link } from 'react-router-dom';

function MyPage() {
  return (
    <main className="app-canvas page-canvas">
      <header className="stack-header">
        <Link className="icon-button" to="/home" aria-label="홈으로">‹</Link>
        <h1>마이페이지</h1>
      </header>

      <section className="profile-card">
        <div className="avatar">P</div>
        <div>
          <strong>게스트</strong>
          <span>둘러보기 모드</span>
        </div>
      </section>

      <section className="metric-grid metric-grid--three">
        <article className="metric-card">
          <span>만든 투표</span>
          <strong>6</strong>
        </article>
        <article className="metric-card">
          <span>받은 표</span>
          <strong>128</strong>
        </article>
        <article className="metric-card">
          <span>베스트컷</span>
          <strong>4</strong>
        </article>
      </section>

      <section className="section-block">
        <div className="section-title">
          <h2>내 투표 목록</h2>
          <span>진행중</span>
        </div>
        <div className="poll-list">
          <Link className="poll-item" to="/result/demo">
            <div>
              <strong>프로필 사진 골라줘</strong>
              <span>마감까지 2일</span>
            </div>
            <em>28명</em>
          </Link>
          <Link className="poll-item" to="/result/summer">
            <div>
              <strong>여행 업로드 컷</strong>
              <span>종료</span>
            </div>
            <em>43명</em>
          </Link>
        </div>
      </section>

      <button className="danger-button" type="button">회원 탈퇴</button>
    </main>
  );
}

export default MyPage;