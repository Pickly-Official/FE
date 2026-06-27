import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AiAnalysisCard from '../components/result/AiAnalysisCard';
import BestCutRanking from '../components/result/BestCutRanking';
import ResultImageSaveButton from '../components/result/ResultImageSaveButton';
import { resultService } from '../services/resultService';
import { formatVoteCount } from '../utils/formatDate';

function ResultPage() {
  const { id = 'demo' } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    let isMounted = true;

    resultService.getResult(id).then((nextResult) => {
      if (isMounted) {
        setResult(nextResult);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (!result) {
    return (
      <main className="app-canvas page-canvas result-canvas">
        <section className="done-card">
          <strong>결과를 불러오는 중</strong>
          <p>친구들의 반응을 정리하고 있어요.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="app-canvas page-canvas result-canvas">
      <header className="page-header">
        <div>
          <p className="eyebrow">결과</p>
          <h1>{result.title}</h1>
          <span className="muted-line">{result.location} · 참여자 {formatVoteCount(result.participantCount)}</span>
        </div>
        <Link className="icon-button" to="/home" aria-label="홈으로">⌂</Link>
      </header>

      <AiAnalysisCard analysis={result.analysis} />
      <BestCutRanking rankings={result.rankings} />
      <ResultImageSaveButton result={result} />
    </main>
  );
}

export default ResultPage;
