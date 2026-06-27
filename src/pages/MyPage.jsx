import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import PollCard from '../components/poll/PollCard';
// import { useAuth } from '../hooks/useAuth'; // Implement this hook
// import { pollService } from '../services/pollService'; // Implement this service

function MyPage() {
  // const { user, logout } = useAuth(); // To be implemented
  const user = { name: '게스트', email: 'guest@example.com' }; // Placeholder
  const logout = () => console.log('Logged out'); // Placeholder

  const [activeTab, setActiveTab] = useState('myPolls');
  const [myPolls, setMyPolls] = useState([]);
  const [votedPolls, setVotedPolls] = useState([]);

  useEffect(() => {
    // Placeholder data
    const fetchMyPolls = () => {
      // In the future, you would fetch this from your backend:
      // const polls = await pollService.getMyPolls();
      // setMyPolls(polls);
      setMyPolls([
        { id: 1, title: '내가 만든 첫번째 투표', author: '게스트', deadline: '2024-07-30' },
        { id: 2, title: '내가 만든 두번째 투표', author: '게스트', deadline: '2024-08-15' },
      ]);
    };

    const fetchVotedPolls = () => {
      // In the future, you would fetch this from your backend:
      // const polls = await pollService.getVotedPolls();
      // setVotedPolls(polls);
      setVotedPolls([
        { id: 3, title: '참여한 첫번째 투표', author: '다른 사용자', deadline: '2024-07-25' },
      ]);
    };

    if (activeTab === 'myPolls') {
      fetchMyPolls();
    } else {
      fetchVotedPolls();
    }
  }, [activeTab]);

  return (
    <div>
      <Header title="마이페이지" />
      <main style={{ padding: '1rem' }}>
        <section style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <Button onClick={logout} variant="secondary">로그아웃</Button>
        </section>

        <nav style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '1rem' }}>
          <Button onClick={() => setActiveTab('myPolls')} variant={activeTab === 'myPolls' ? 'primary' : 'secondary'}>
            내가 만든 투표
          </Button>
          <Button onClick={() => setActiveTab('votedPolls')} variant={activeTab === 'votedPolls' ? 'primary' : 'secondary'}>
            참여한 투표
          </Button>
        </nav>

        <div>
          {activeTab === 'myPolls' && (
            <div>
              {myPolls.length > 0 ? (
                myPolls.map(poll => <PollCard key={poll.id} poll={poll} />)
              ) : (
                <p>내가 만든 투표가 없습니다.</p>
              )}
            </div>
          )}
          {activeTab === 'votedPolls' && (
            <div>
              {votedPolls.length > 0 ? (
                votedPolls.map(poll => <PollCard key={poll.id} poll={poll} />)
              ) : (
                <p>참여한 투표가 없습니다.</p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MyPage;
