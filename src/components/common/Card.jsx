function Card({ children, className = "", onClick }) {
  return (
    <div className={`common-card ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}

export default Card;