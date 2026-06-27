import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';

const BrandLogo = () => (
  <svg className="pickly-brand-logo" width="168" height="78" viewBox="0 0 168 78" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M72.333 46V23.375H81.208C86.3643 23.375 89.3018 26.5312 89.3018 31C89.3018 35.5312 86.3018 38.625 81.083 38.625H77.0205V46H72.333ZM77.0205 34.8438H80.333C83.1143 34.8438 84.458 33.2812 84.458 31C84.458 28.75 83.1143 27.2188 80.333 27.2188H77.0205V34.8438ZM92.1768 46V29.0312H96.8018V46H92.1768ZM94.4893 26.8125C93.083 26.8125 91.958 25.75 91.958 24.4688C91.958 23.1562 93.083 22.0938 94.4893 22.0938C95.8643 22.0938 96.9893 23.1562 96.9893 24.4688C96.9893 25.75 95.8643 26.8125 94.4893 26.8125ZM108.021 46.3438C102.833 46.3438 99.708 42.75 99.708 37.5625C99.708 32.375 102.864 28.8125 108.021 28.8125C112.396 28.8125 115.364 31.375 115.552 35.25H111.208C110.927 33.5625 109.833 32.4062 108.083 32.4062C105.864 32.4062 104.396 34.2812 104.396 37.5C104.396 40.7812 105.833 42.6562 108.083 42.6562C109.708 42.6562 110.927 41.6562 111.208 39.8438H115.552C115.333 43.6875 112.521 46.3438 108.021 46.3438ZM118.427 46V23.375H123.052V35.5312H123.302L128.802 29.0312H134.114L127.802 36.375L134.458 46H129.021L124.364 39.0938L123.052 40.5625V46H118.427ZM140.896 23.375V46H136.271V23.375H140.896ZM147.208 52.375C146.302 52.375 145.458 52.3438 144.864 52.2812V48.6875C145.458 48.7188 146.146 48.75 146.739 48.75C147.646 48.75 148.396 48.6562 148.958 47.1875L149.239 46.4688L143.146 29.0312H147.989L151.552 41.5312H151.739L155.333 29.0312H160.239L153.614 47.875C152.646 50.5938 150.802 52.375 147.208 52.375Z" fill="white" />
    <g filter="url(#pickly-logo-filter-glow)">
      <circle cx="35" cy="36" r="35" fill="url(#pickly-logo-gradient-glow)" />
    </g>
    <g filter="url(#pickly-logo-filter-shadow)">
      <rect width="37" height="37" rx="10" transform="matrix(0.919856 -0.392256 0.477495 0.878634 9.00024 26.5137)" fill="#125C5F" fillOpacity="0.5" shapeRendering="crispEdges" />
    </g>
    <rect width="37" height="37" rx="10" transform="matrix(0.992624 0.121232 -0.156612 0.98766 19.543 14.7705)" fill="url(#pickly-logo-gradient-card)" />
    <rect x="1.25402" y="1.66334" width="24" height="24" rx="8.5" transform="matrix(0.992624 0.121232 -0.156612 0.98766 23.4983 20.8685)" stroke="white" strokeWidth="3" />
    <path d="M32.0002 38.4355L37.6549 44.5435" stroke="black" strokeWidth="3" strokeLinecap="round" />
    <path d="M51.8175 36.1792C52.4714 35.7047 52.5606 34.7922 52.0168 34.1409C51.473 33.4897 50.502 33.3464 49.8481 33.8208L50.8328 35L51.8175 36.1792ZM36.8618 43.2429C36.2079 43.7173 36.1186 44.6298 36.6625 45.2811C37.2063 45.9323 38.1773 46.0756 38.8312 45.6012L37.8465 44.422L36.8618 43.2429ZM50.8328 35L49.8481 33.8208L36.8618 43.2429L37.8465 44.422L38.8312 45.6012L51.8175 36.1792L50.8328 35Z" fill="black" />
    <defs>
      <filter id="pickly-logo-filter-glow" x="-7" y="-6" width="84" height="84" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3.5" result="effect1_foregroundBlur_0_1" />
      </filter>
      <filter id="pickly-logo-filter-shadow" x="8.60767" y="15.0845" width="52.4873" height="48.8545" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
      </filter>
      <linearGradient id="pickly-logo-gradient-glow" x1="17.3011" y1="7.72316" x2="57.1772" y2="62.1198" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0F4349" />
        <stop offset="0.298077" stopColor="#111828" />
      </linearGradient>
      <linearGradient id="pickly-logo-gradient-card" x1="4.44847" y1="3.31766" x2="33.2497" y2="34.548" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0DD5B1" />
        <stop offset="1" stopColor="#5974E9" />
      </linearGradient>
    </defs>
  </svg>
);

const NavIcon = ({ type }) => {
  if (type === 'home') {
    return (
      <svg className="pickly-nav-svg pickly-nav-svg--home" width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="26" cy="26" r="26" fill="#002A33" />
        <path d="M23.8 38V28.4706H29.2V38H35.95V25.2941H40L26.5 11L13 25.2941H17.05V38H23.8Z" fill="#00EFA5" />
      </svg>
    );
  }

  if (type === 'create') {
    return (
      <svg className="pickly-nav-svg pickly-nav-svg--create" width="50" height="50" viewBox="64 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="89" cy="25" r="25" fill="url(#pickly-create-gradient)" />
        <path d="M81 24.5H98" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
        <path d="M89.9048 16L89.9048 33" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
        <defs>
          <linearGradient id="pickly-create-gradient" x1="60.1538" y1="6.73077" x2="120.731" y2="45.1923" gradientUnits="userSpaceOnUse">
            <stop offset="0.365385" stopColor="#00D8BF" />
            <stop offset="0.798077" stopColor="#5390F3" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return (
    <svg className="pickly-nav-svg pickly-nav-svg--mypage" width="50" height="50" viewBox="126 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M151 1C164.248 1 175 11.7523 175 25C175 38.2477 164.248 49 151 49C137.752 49 127 38.2477 127 25C127 11.7523 137.752 1 151 1ZM151 31.5C144.966 31.5 139.426 33.5813 135.034 37.0117L134.223 37.6465L134.881 38.4385C139.373 43.8504 145.673 46 151 46C156.327 46 162.627 43.8504 167.119 38.4385L167.777 37.6465L166.966 37.0117C162.574 33.5813 157.034 31.5 151 31.5ZM151 9C145.623 9 141.25 13.3727 141.25 18.75C141.25 24.1273 145.623 28.5 151 28.5C156.377 28.5 160.75 24.1273 160.75 18.75C160.75 13.3727 156.377 9 151 9Z" fill="#031426" stroke="#00EFA5" strokeWidth="2" />
    </svg>
  );
};

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
        <button type="button" className="pickly-brand" onClick={() => navigate(ROUTES.HOME)} aria-label="Pickly 홈">
          <BrandLogo />
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
            <span className="pickly-nav-icon" aria-hidden="true">
              <NavIcon type={item.key} />
            </span>
          </button>
        ))}
      </nav>
    </header>
  );
}

export default PicklyTopBar;
