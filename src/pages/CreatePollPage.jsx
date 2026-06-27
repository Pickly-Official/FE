import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const deadlines = ['24시간', '3일', '7일'];

function CreatePollPage() {
  const navigate = useNavigate();
  const [deadline, setDeadline] = useState('3일');

  return (
    <main className="app-canvas page-canvas create-canvas">
      <header className="stack-header">
        <button className="icon-button" type="button" onClick={() => navigate('/home')} aria-label="뒤로가기">
          ‹
        </button>
        <h1>새 투표 만들기</h1>
      </header>

      <label className="field-group">
        <span>투표 제목</span>
        <input type="text" placeholder="투표의 제목을 작성해주세요!" />
      </label>

      <section className="section-block">
        <div className="section-title">
          <h2>사진 업로드</h2>
          <span>2/10</span>
        </div>
        <div className="photo-grid">
          <div className="photo-tile photo-tile--filled">1</div>
          <div className="photo-tile photo-tile--filled">2</div>
          <button className="photo-tile photo-tile--add" type="button">+</button>
        </div>
      </section>

      <section className="location-panel">
        <div>
          <strong>위치 정보 활용</strong>
          <span>EXIF 기준으로 50m 단위 자동 그룹화</span>
        </div>
        <input type="checkbox" defaultChecked aria-label="위치 정보 활용" />
      </section>

      <section className="location-card">
        <div>
          <span>자동 그룹</span>
          <strong>서울숲 근처</strong>
        </div>
        <button type="button">재설정</button>
      </section>

      <section className="section-block">
        <div className="section-title">
          <h2>마감일</h2>
        </div>
        <div className="segmented-control">
          {deadlines.map((item) => (
            <button
              className={deadline === item ? 'is-active' : ''}
              type="button"
              key={item}
              onClick={() => setDeadline(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <button className="sticky-cta" type="button" onClick={() => navigate('/share/demo')}>
        투표 생성
      </button>
    </main>
  );
}

export default CreatePollPage;
