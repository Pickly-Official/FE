function Loading({ text = "로딩 중..." }) {
  return (
    <div className="loading-wrap">
      <div className="loading-spinner" />
      <p>{text}</p>
    </div>
  );
}

export default Loading;