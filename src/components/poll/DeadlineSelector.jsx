import { POLL_OPTIONS } from '../../constants/pollOptions';

function DeadlineSelector({ value, onChange, error = '' }) {
  return (
    <section className="section-block">
      <div className="section-title">
        <h2>마감일</h2>
      </div>
      <div className="segmented-control">
        {POLL_OPTIONS.durations.map((option) => (
          <button
            className={value === option.value ? 'is-active' : ''}
            type="button"
            key={option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      {error && <p className="form-error">{error}</p>}
    </section>
  );
}

export default DeadlineSelector;
