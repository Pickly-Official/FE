import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';

function PicklyTopBar({ active = '', showBrand = true }) {
  const navigate = useNavigate();

  const navItems = [
    { key: 'home', label: '홈', route: ROUTES.HOME },
    { key: 'create', label: '투표 생성', route: ROUTES.CREATE },
    { key: 'mypage', label: '마이페이지', route: ROUTES.MYPAGE },
  ];

  return (
    <header className="pickly-top-bar">
      {showBrand && (
        <button type="button" className="pickly-brand" onClick={() => navigate(ROUTES.HOME)}>
          <span className="pickly-brand-mark" aria-hidden="true">
            <span />
          </span>
          <span className="pickly-brand-text">Pickly</span>
        </button>
      )}

      <nav className="pickly-nav" aria-label="주요 메뉴">
        {navItems.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`pickly-nav-button ${active === item.key ? 'is-active' : ''}`}
            onClick={() => navigate(item.route)}
            aria-label={item.label}
          >
            <span className="pickly-nav-icon" aria-hidden="true" />
          </button>
        ))}
      </nav>
    </header>
  );
}

export default PicklyTopBar;
