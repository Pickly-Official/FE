import { useState } from 'react';
import { Link } from 'react-router-dom';

const spots = [
  { name: '서울숲', rate: '92%', tags: ['감성', '초록', '햇살'], tone: 'forest' },
  { name: '성수 카페거리', rate: '88%', tags: ['카페', '인물'], tone: 'cafe' },
  { name: '한강공원', rate: '84%', tags: ['야경', '피크닉'], tone: 'river' },
];

const activePolls = [
  { id: 'demo', title: '프로필 사진 골라줘', status: '마감까지 2일', count: 12 },
  { id: 'cafe', title: '카페 업로드 사진', status: '마감까지 6시간', count: 9 },
];

const closedPolls = [
  { id: 'summer', title: '여행 업로드 컷', status: '종료됨', count: 28 },
  { id: 'profile', title: '새 프로필 후보', status: '종료됨', count: 43 },
];

function HomePage() {
  return <div>홈 페이지</div>;
}

export default HomePage;