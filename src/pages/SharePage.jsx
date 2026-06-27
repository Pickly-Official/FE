import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { shareKakaoVote } from '../services/kakaoShareService';
import { copyToClipboard } from '../utils/copyToClipboard';

function SharePage() {
  const { id = 'demo' } = useParams();
  const { state } = useLocation();
  const [copyStatus, setCopyStatus] = useState('');
  const shareUrl = `${window.location.origin}/vote/${id}`;

  const handleCopy = async () => {
    const copied = await copyToClipboard(shareUrl);
    setCopyStatus(copied ? '링크를 복사했어요.' : '복사에 실패했어요.');
  };

  const handleKakaoShare = async () => {
    const title = state?.title ? `"${state.title}" 투표에 참여해보세요!` : 'Pickly 투표에 참여해보세요!';
    const description = state?.photoCount
      ? `사진 ${state.photoCount}장 중 베스트컷을 골라주세요.`
      : '친구의 사진을 스와이프하고 베스트컷을 골라주세요.';

    try {
      await shareKakaoVote({
        title,
        description,
        url: shareUrl,
        imageUrl: state?.imageUrl,
      });
      setCopyStatus('');
    } catch (error) {
      const copied = await copyToClipboard(shareUrl);
      setCopyStatus(
        copied
          ? '카카오 공유 설정을 확인해주세요. 대신 링크를 복사했어요.'
          : error.message || '카카오 공유에 실패했어요.',
      );
    }
  };

  return (
    <main className="app-canvas page-canvas centered-canvas">
      <section className="success-mark" aria-hidden="true">
        <span />
      </section>
      <h1>투표가 만들어졌어요</h1>
      <p className="muted-copy">
        {state?.title ? `"${state.title}" 링크를 친구들에게 보내보세요.` : '친구들에게 링크를 보내고 스와이프 평가를 받아보세요.'}
      </p>

      {state?.photoCount && (
        <div className="share-summary">
          <span>사진 {state.photoCount}장</span>
          <span>{state.deadlineHours}시간 후 마감</span>
        </div>
      )}

      <div className="share-box">
        <span>{shareUrl}</span>
        <button type="button" onClick={handleCopy}>복사</button>
      </div>
      {copyStatus && <p className="helper-copy">{copyStatus}</p>}

      <button className="kakao-share" type="button" onClick={handleKakaoShare}>카카오톡으로 공유</button>
      <Link className="text-link" to={`/vote/${id}`}>친구들이 보는 화면 미리보기</Link>
      <Link className="secondary-cta" to={`/result/${id}`}>내 투표 결과 보기</Link>
    </main>
  );
}

export default SharePage;
