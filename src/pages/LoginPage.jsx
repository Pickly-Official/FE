<<<<<<< HEAD
import { useNavigate } from "react-router-dom";

import { SOCIAL_LOGIN_TYPES } from "../constants/socialLogin";
import { ROUTES } from "../constants/routes";
import { startSocialLogin } from "../services/authService";
=======
import { useNavigate } from 'react-router-dom';

const socialLogins = [
  { id: 'naver', label: 'Naver', mark: 'N' },
  { id: 'google', label: 'Google', mark: 'G' },
  { id: 'kakao', label: 'Kakao', mark: 'TALK' },
  { id: 'apple', label: 'Apple', mark: 'A' },
];
>>>>>>> origin/main

function LoginPage() {
  const navigate = useNavigate();

<<<<<<< HEAD
  const handleSocialLogin = (provider) => {
    startSocialLogin(provider);
  };

  const handleGuestEnter = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className="login-page">
      <div className="login-mascot-group">
        <div className="login-mascot-icon">✓</div>
      </div>

      <div className="login-logo-text">pickly</div>

      <p className="login-main-text">
        친구들의 반응으로
        <br />
        베스트컷을 찾아보세요!
      </p>

      <p className="login-sub-text">
        스와이프 한 번이면 충분해요. AI가 이유까지 알려드려요.
      </p>

      <div className="kakao-login-frame">
        {SOCIAL_LOGIN_TYPES.map((item) => (
          <button
            key={item.provider}
            type="button"
            className="kakao-login-button"
            onClick={() => handleSocialLogin(item.provider)}
            aria-label={item.label}
          >
            {item.text}
          </button>
        ))}
      </div>

      <button type="button" className="guest-link" onClick={handleGuestEnter}>
        둘러보기 →
      </button>
    </div>
=======
  return (
    <main className="app-canvas login-canvas">
      <section className="login-hero" aria-label="Pickly 로그인">
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
          베스트컷을 찾아보세요!
        </p>
        <p className="login-subcopy">스와이프 한 번이면 충분해요. AI가 이유까지 알려드려요.</p>

        <div className="social-row" aria-label="소셜 로그인">
          {socialLogins.map((item) => (
            <button className={`social-button social-button--${item.id}`} type="button" key={item.id}>
              <span>{item.mark}</span>
            </button>
          ))}
        </div>

        <button className="ghost-link" type="button" onClick={() => navigate('/home')}>
          둘러보기 →
        </button>
      </section>
    </main>
>>>>>>> origin/main
  );
}

export default LoginPage;