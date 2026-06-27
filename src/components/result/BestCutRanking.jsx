function BestCutRanking({ rankings }) {
  return (
    <section className="section-block">
      <div className="section-title">
        <h2>베스트컷 랭킹</h2>
        <span>TOP {rankings.length}</span>
      </div>
      <div className="ranking-list">
        {rankings.map((item) => (
          <article className={`ranking-card ${item.rank === 1 ? 'ranking-card--best' : ''}`} key={item.id}>
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
  );
}

export default BestCutRanking;
