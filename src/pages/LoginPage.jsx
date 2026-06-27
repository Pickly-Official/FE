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
    <main className="app-canvas login-canvas">
      <section className="login-hero">
        <div className="brand-mark" aria-hidden="true">
          <div className="brand-mark__shadow" />
          <div className="brand-mark__card">
            <span />
          </div>
        </div>

        <h1 className="brand-title">Pickly</h1>

        <p className="login-copy">
          친구들의 반응으로
          <br />
          <span>베스트컷</span>을 찾아보세요!
        </p>

        <p className="login-subcopy">스와이프 한 번이면 충분해요. AI가 이유까지 알려드려요.</p>

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

        <button type="button" className="ghost-link" onClick={handleGuestEnter}>
          둘러보기 →
        </button>
      </section>
    </main>
  );
}

export default LoginPage;
