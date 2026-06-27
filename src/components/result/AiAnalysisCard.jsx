function AiAnalysisCard({ analysis }) {
  return (
    <section className="ai-card">
      <div className="section-title">
        <h2>{analysis.title}</h2>
        <span>{analysis.model}</span>
      </div>
      <p>{analysis.summary}</p>
      <div>
        {analysis.tags.map((tag) => (
          <span className="tag" key={tag}>#{tag}</span>
        ))}
      </div>
    </section>
  );
}

export default AiAnalysisCard;
