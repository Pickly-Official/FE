import { useNavigate } from "react-router-dom";

import { ROUTES } from "../constants/routes";
import { authService } from "../services/authService";

function GoogleIcon() {
  return (
    <svg className="google-login-icon" width="30" height="30" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path fill="#FFC107" d="M43.61 20.08H42V20H24v8h11.31C33.66 32.66 29.22 36 24 36c-6.63 0-12-5.37-12-12s5.37-12 12-12c3.06 0 5.84 1.15 7.96 3.04l5.66-5.66C34.05 6.05 29.27 4 24 4 12.95 4 4 12.95 4 24s8.95 20 20 20c10.48 0 19.35-7.65 19.35-20 0-1.34-.14-2.62-.39-3.92Z" />
      <path fill="#FF3D00" d="m6.31 14.69 6.57 4.82C14.66 15.1 18.97 12 24 12c3.06 0 5.84 1.15 7.96 3.04l5.66-5.66C34.05 6.05 29.27 4 24 4 16.32 4 9.66 8.34 6.31 14.69Z" />
      <path fill="#4CAF50" d="M24 44c5.17 0 9.86-1.98 13.41-5.2l-6.19-5.24C29.15 35.13 26.64 36 24 36c-5.2 0-9.62-3.31-11.29-7.93l-6.52 5.02C9.5 39.56 16.22 44 24 44Z" />
      <path fill="#1976D2" d="M43.61 20.08H42V20H24v8h11.31c-.79 2.24-2.23 4.17-4.09 5.56l6.19 5.24C36.97 39.2 44 34 44 24c0-1.34-.14-2.62-.39-3.92Z" />
    </svg>
  );
}

function LoginPage() {
  const navigate = useNavigate();

  const handleGuestEnter = () => {
    navigate(ROUTES.HOME);
  };

  const handleGoogleLogin = () => {
    authService.startSocialLogin("google");
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

        <div className="google-login-frame">
          <button type="button" className="google-login-button" onClick={handleGoogleLogin} aria-label="구글 로그인">
            <GoogleIcon />
          </button>
        </div>

        <button type="button" className="ghost-link" onClick={handleGuestEnter}>
          둘러보기 →
        </button>
      </section>
    </main>
  );
}

export default LoginPage;
