import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthPage, HomePage, CreatePage, SharePage, VotePage, ResultPage, MyPage } from './pages';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/create" element={<CreatePage />} />
        <Route path="/home/create/share/:id" element={<SharePage />} />
        <Route path="/home/create/share/:id/vote" element={<VotePage />} />
        <Route path="/home/create/share/:id/result" element={<ResultPage />} />
        <Route path="/home/result/:id" element={<ResultPage />} />
        <Route path="/home/mypage" element={<MyPage />} />
        <Route path="/vote/:id" element={<VotePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
