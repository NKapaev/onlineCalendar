import "./button.css";

export default function Button({
  className = "",
  variant = "primary",
  disabled = false,
  icon,
  iconFill = "currentColor",
  iconStroke = "currentColor",
  onClick,
  children,
  ...props
}) {
  return (
    <button
      className={`button ${variant} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && (
        <svg
          width={16}
          height={16}
          className="button-icon"
          fill={iconFill}
          stroke={iconStroke}
        >
          <use href={`${icon}`} />
        </svg>
      )}
      {children}
    </button>
  );
}
