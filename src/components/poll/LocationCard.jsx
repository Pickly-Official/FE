function LocationCard({ locationGroups = [], selectedLocation = '', onReset }) {
  return (
    <section className="location-panel location-analysis-panel">
      <div className="location-panel-head">
        <span className="location-panel-icon" aria-hidden="true" />
        <div>
          <strong>위치 분석 결과</strong>
          <span>사진의 위치 정보를 기준으로 가까운 포토스팟끼리 묶었어요.</span>
        </div>
      </div>

      <div className="location-group-list">
        {locationGroups.map((group) => {
          const isSelected = group.name === selectedLocation;

          return (
          <article className={`location-card ${isSelected ? 'is-selected' : ''}`} key={group.name}>
            <div>
              <strong>{group.name}</strong>
              <span>{group.photos}</span>
            </div>
            <button type="button" onClick={() => onReset?.(group.name)} disabled={isSelected}>
              {isSelected ? '선택됨' : '선택'}
            </button>
          </article>
          );
        })}
      </div>
    </section>
  );
}

export default LocationCard;
