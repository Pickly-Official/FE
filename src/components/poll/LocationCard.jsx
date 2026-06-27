function LocationCard({ locationGroups = [], onReset }) {
  return (
    <section className="location-panel location-analysis-panel">
      <div className="location-panel-head">
        <span className="location-panel-icon" aria-hidden="true" />
        <div>
          <strong>위치 정보 활용</strong>
          <span>EXIF 기반으로 50m 단위 자동 그룹화됩니다. 포토스팟 통계에 활용돼요.</span>
        </div>
      </div>

      <div className="location-group-list">
        {locationGroups.map((group) => (
          <article className="location-card" key={group.name}>
            <div>
              <strong>{group.name}</strong>
              <span>{group.photos}</span>
            </div>
            <button type="button" onClick={() => onReset?.(group.name)}>
              재설정
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default LocationCard;
