import { Link } from 'react-router-dom';

const rankings = [
  { rank: 1, title: '햇살 정면 컷', rate: 86, comment: '표정이 가장 자연스럽고 조명이 안정적이에요.' },
  { rank: 2, title: '카페 창가 컷', rate: 72, comment: '배경 분위기가 좋고 인물 집중도가 높아요.' },
  { rank: 3, title: '거리 배경 컷', rate: 58, comment: '구도는 좋지만 얼굴 그림자가 조금 강해요.' },
];

function ResultPage() {
  return (
    <main className="app-canvas page-canvas result-canvas">
      <header className="page-header">
        <div>
          <p className="eyebrow">결과</p>
          <h1>프로필 사진 골라줘</h1>
          <span className="muted-line">서울숲 · 참여자 28명</span>
        </div>
        <Link className="icon-button" to="/home" aria-label="홈으로">⌂</Link>
      </header>

      <section className="ai-card">
        <div className="section-title">
          <h2>AI 분석 인사이트</h2>
          <span>GPT-4o Vision</span>
        </div>
        <p>친구들은 밝은 표정과 깔끔한 배경이 있는 사진을 더 선호했어요.</p>
        <div>
          <span className="tag">#자연스러움</span>
          <span className="tag">#밝은조명</span>
          <span className="tag">#프로필추천</span>
        </div>
      </section>

      <section className="section-block">
        <div className="section-title">
          <h2>베스트컷 랭킹</h2>
          <span>TOP 3</span>
        </div>
        <div className="ranking-list">
          {rankings.map((item) => (
            <article className={`ranking-card ${item.rank === 1 ? 'ranking-card--best' : ''}`} key={item.rank}>
              <div className="ranking-thumb">{item.rank}</div>
              <div className="ranking-content">
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.rate}%</span>
                </div>
                <div className="gauge"><span style={{ width: `${item.rate}%` }} /></div>
                <p>{item.comment}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <button className="secondary-cta" type="button">결과 이미지 저장</button>
    </main>
  );
}

export default ResultPage;
