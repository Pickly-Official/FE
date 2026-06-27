import { Link, useParams } from 'react-router-dom';

function SharePage() {
  const { id = 'demo' } = useParams();
  const shareUrl = `https://pickly.app/vote/${id}`;

  return (
    <main className="app-canvas page-canvas centered-canvas">
      <section className="success-mark" aria-hidden="true">
        <span />
      </section>
      <h1>투표가 만들어졌어요</h1>
      <p className="muted-copy">친구들에게 링크를 보내고 스와이프 평가를 받아보세요.</p>

      <div className="share-box">
        <span>{shareUrl}</span>
        <button type="button">복사</button>
      </div>

      <button className="kakao-share" type="button">카카오톡으로 공유</button>
      <Link className="text-link" to={`/vote/${id}`}>친구들이 보는 화면 미리보기</Link>
      <Link className="secondary-cta" to={`/result/${id}`}>내 투표 결과 보기</Link>
    </main>
  );
}

export default SharePage;
