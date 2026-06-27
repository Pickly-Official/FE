import { useNavigate } from "react-router-dom";

import { SOCIAL_LOGIN_OPTIONS } from "../constants/socialLogin";
import { ROUTES } from "../constants/routes";
import { authService } from "../services/authService";

function LoginPage() {
  const navigate = useNavigate();

  const handleSocialLogin = (provider) => {
    authService.startSocialLogin(provider);
  };

  const handleGuestEnter = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className="login-page">
      <div className="login-mascot-group">
        <div className="login-mascot-icon">✓</div>
      </div>

      <div className="login-logo-text">Pickly</div>

      <p className="login-main-text">
        친구들의 반응으로
        <br />
        베스트컷을 찾아보세요!
      </p>

      <p className="login-sub-text">
        스와이프 한 번이면 충분해요. AI가 이유까지 알려드려요.
      </p>

      <div className="kakao-login-frame">
        {SOCIAL_LOGIN_OPTIONS.map((item) => (
          <button
            key={item.id}
            type="button"
            className="kakao-login-button"
            onClick={() => handleSocialLogin(item.provider)}
            aria-label={item.label}
          >
            {item.label}
          </button>
        ))}
      </div>

      <button type="button" className="guest-link" onClick={handleGuestEnter}>
        둘러보기 →
      </button>
    </div>
  );
}

export default LoginPage;