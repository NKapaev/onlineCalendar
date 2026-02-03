export default function Icon({
  name,
  className = "",
  iconFill = "currentColor",
  size = "16px",
}) {
  return (
    <div className={className}>
      <svg width={size} height={size} style={{ fill: iconFill }} href={name} />
    </div>
  );
}
