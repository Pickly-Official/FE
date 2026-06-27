function Button({
  children,
  type = "button",
  variant = "primary",
  size = "medium",
  fullWidth = false,
  disabled = false,
  onClick,
  className = "",
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={[
        "common-button",
        `common-button-${variant}`,
        `common-button-${size}`,
        fullWidth ? "common-button-full" : "",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export default Button;