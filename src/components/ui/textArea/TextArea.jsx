import "./textarea.css";

export default function TextArea({
  textareaTitle = "Text Area",
  placeholder = "Enter your text",
  width = "100%",
  height = "85px",
  value,
  onChange,
}) {
  return (
    <div className="textarea-container" style={{ width, height }}>
      <h2 className="textarea-title">{textareaTitle}</h2>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="textarea"
        placeholder={placeholder}
        style={{ height }}
      />
    </div>
  );
}
