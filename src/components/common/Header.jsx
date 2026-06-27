import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

function Header({ title = "Pickly", showBack = false, rightContent }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header className="header">
      <div className="header-left">
        {showBack ? (
          <button type="button" className="header-back-button" onClick={handleBack}>
            ‹
          </button>
        ) : (
          <div className="header-brand" onClick={() => navigate(ROUTES.HOME)}>
            <div className="header-logo-mark">✓</div>
            <span className="header-title">{title}</span>
          </div>
        )}
      </div>

      <div className="header-right">
        {rightContent || (
          <nav className="header-nav" aria-label="주요 메뉴">
            <button type="button" className="header-nav-button" onClick={() => navigate(ROUTES.HOME)}>
              ⌂
            </button>

            <button
              type="button"
              className="header-nav-button filled"
              onClick={() => navigate(ROUTES.CREATE)}
            >
              +
            </button>

            <button
              type="button"
              className="header-nav-button"
              onClick={() => navigate(ROUTES.MYPAGE)}
            >
              ○
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;