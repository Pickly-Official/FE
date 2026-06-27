import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

function Header({ title = "Pickly" }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-brand">
        <div className="header-logo-mark">✓</div>
        <span className="header-title">{title}</span>
      </div>

      <nav className="header-nav">
        <button type="button" className="header-nav-button" onClick={() => navigate(ROUTES.HOME)}>
          ⌂
        </button>

        <button type="button" className="header-nav-button filled" onClick={() => navigate(ROUTES.CREATE)}>
          +
        </button>

        <button type="button" className="header-nav-button" onClick={() => navigate(ROUTES.MYPAGE)}>
          ○
        </button>
      </nav>
    </header>
  );
}

export default Header;