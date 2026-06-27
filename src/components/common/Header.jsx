import { useNavigate } from "react-router-dom";

function Header({ title = "Pickly", showBack = false, rightContent }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-left">
        {showBack && (
          <button type="button" className="header-back-button" onClick={() => navigate(-1)}>
            ←
          </button>
        )}

        <div className="header-brand">
          <div className="header-logo-mark">✓</div>
          <span className="header-title">{title}</span>
        </div>
      </div>

      {rightContent && <div className="header-right">{rightContent}</div>}
    </header>
  );
}

export default Header;