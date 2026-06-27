export function formatDate(date) {
  return new Date(date).toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
  });
}

export function formatVoteCount(count) {
  return `${count.toLocaleString('ko-KR')}명`;
}
