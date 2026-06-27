import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import CreatePollPage from '../pages/CreatePollPage';
import SharePage from '../pages/SharePage';
import VotePage from '../pages/VotePage';
import ResultPage from '../pages/ResultPage';
import MyPage from '../pages/MyPage';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/create" element={<CreatePollPage />} />
        <Route path="/share/:id" element={<SharePage />} />
        <Route path="/result/:id" element={<ResultPage />} />
        <Route path="/home/create" element={<CreatePollPage />} />
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
}

export default AppRouter;
