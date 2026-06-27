function LocationCard({ enabled, onEnabledChange, locationName, onReset }) {
  return (
    <>
      <section className="location-panel">
        <div>
          <strong>위치 정보 활용</strong>
          <span>EXIF 기준으로 50m 단위 자동 그룹화</span>
        </div>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(event) => onEnabledChange(event.target.checked)}
            aria-label="위치 정보 활용"
          />
          <span />
        </label>
      </section>

      <section className={`location-card ${!enabled ? 'is-disabled' : ''}`}>
        <div>
          <span>{enabled ? '자동 그룹' : '위치 정보 꺼짐'}</span>
          <strong>{enabled ? locationName : '위치 없이 투표 만들기'}</strong>
        </div>
        <button type="button" onClick={onReset} disabled={!enabled}>
          재설정
        </button>
      </section>
    </>
  );
}

export default LocationCard;
