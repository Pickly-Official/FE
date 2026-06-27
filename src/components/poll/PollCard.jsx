function PollCard({ title, status, count, href, children }) {
  const content = children ?? (
    <>
      <div>
        <strong>{title}</strong>
        <span>{status}</span>
      </div>
      <em>{count}명</em>
    </>
  );

  if (href) {
    return (
      <a className="poll-item" href={href}>
        {content}
      </a>
    );
  }

  return <article className="poll-item">{content}</article>;
}

export default PollCard;
