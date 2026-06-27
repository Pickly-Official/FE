import { useState } from 'react';

function ResultImageSaveButton({ result }) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const best = result.rankings[0];
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop stop-color="#041124"/>
            <stop offset="1" stop-color="#0D223E"/>
          </linearGradient>
          <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
            <stop stop-color="#0DD5B1"/>
            <stop offset="1" stop-color="#5974E9"/>
          </linearGradient>
        </defs>
        <rect width="900" height="1200" fill="url(#bg)"/>
        <text x="80" y="130" fill="#0DD5B1" font-size="34" font-family="Arial" font-weight="700">Pickly Result</text>
        <text x="80" y="210" fill="#FFFFFF" font-size="58" font-family="Arial" font-weight="800">${result.title}</text>
        <rect x="80" y="300" width="740" height="520" rx="36" fill="url(#accent)"/>
        <text x="130" y="430" fill="#041124" font-size="42" font-family="Arial" font-weight="900">BEST CUT</text>
        <text x="130" y="535" fill="#FFFFFF" font-size="72" font-family="Arial" font-weight="900">${best.title}</text>
        <text x="130" y="640" fill="#FFFFFF" font-size="56" font-family="Arial" font-weight="900">${best.rate}%</text>
        <text x="80" y="920" fill="#D9DEEA" font-size="34" font-family="Arial">${result.analysis.summary}</text>
        <text x="80" y="1020" fill="#8B94A7" font-size="28" font-family="Arial">참여자 ${result.participantCount}명 · ${result.location}</text>
      </svg>
    `;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `pickly-result-${result.id}.svg`;
    anchor.click();
    URL.revokeObjectURL(url);
    setSaved(true);
  };

  return (
    <button className="secondary-cta" type="button" onClick={handleSave}>
      {saved ? '결과 이미지 저장 완료' : '결과 이미지 저장'}
    </button>
  );
}

export default ResultImageSaveButton;
