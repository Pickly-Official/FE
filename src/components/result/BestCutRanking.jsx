const rankLabels = ['🥇 1위', '🥈 2위', '🥉 3위'];

const getCriteriaValue = (item, key) => item?.criteria?.[key] || item?.[key] || '';
const getPhotoUrl = (item) => (
  item?.imageUrl
  || item?.photoUrl
  || item?.s3Url
  || item?.thumbnailUrl
  || item?.photo?.imageUrl
  || item?.photo?.s3Url
  || ''
);

const criteriaRows = [
  ['composition', '구도'],
  ['expression', '표정'],
  ['lighting', '조명'],
];

function BestCutRanking({ rankings = [] }) {
  const visibleRankings = rankings;

  if (!visibleRankings.length) {
    return null;
  }

  return (
    <section className="section-block">
      <div className="section-title">
        <h2>베스트컷 랭킹</h2>
        <span>TOP {visibleRankings.length}</span>
      </div>

      <div className="ranking-list">
        {visibleRankings.map((item, index) => {
          const isTopThree = index < 3;
          const isWinner = index === 0;
          const rankText = isTopThree ? rankLabels[index] : `${item.rank || index + 1}위`;

          return (
          <article
            className={`ranking-card ${isWinner ? 'ranking-card--winner' : ''} ${!isTopThree ? 'ranking-card--compact' : ''}`}
            key={item.id}
          >
            <div className={`ranking-card-photo ${item.tone ? `ranking-card-photo--${item.tone}` : ''}`}>
              {getPhotoUrl(item) && <img src={getPhotoUrl(item)} alt={item.title} />}
              {!getPhotoUrl(item) && <div className="ranking-photo-fallback" aria-hidden="true" />}
            </div>

            <div className="ranking-card-content">
              <div className="ranking-card-head">
                <strong>{rankText}</strong>
                <em>{item.rate}%</em>
              </div>

              <div className="ranking-card-progress" aria-label={`${item.rank}위 선호도 ${item.rate}%`}>
                <span style={{ width: `${item.rate}%` }} />
              </div>

              {isTopThree && (
                <dl className="ranking-card-criteria">
                  {criteriaRows.map(([key, label]) => (
                    <div className="ranking-card-criteria-row" key={key}>
                      <dt>{label}:</dt>
                      <dd>{getCriteriaValue(item, key)}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </article>
          );
        })}
      </div>
    </section>
  );
}

export default BestCutRanking;
