import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

function OAuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      localStorage.setItem('accessToken', token);
      navigate(ROUTES.HOME, { replace: true });
      return;
    }

    navigate(ROUTES.LOGIN, { replace: true });
  }, [navigate, searchParams]);

  return (
    <main className="app-canvas page-canvas">
      <section className="done-card">
        <strong>로그인 처리 중</strong>
      </section>
    </main>
  );
}

export default OAuthCallbackPage;
