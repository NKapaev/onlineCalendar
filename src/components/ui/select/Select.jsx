import "./select.css";
import { useState } from "react";

export default function Select({
  options = [],
  disabled = false,
  width,
  className = "",
  title = "",
  value = options[0],
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`select-container ${className}`} style={{ width }}>
      {title ? <h3 className="input-label">{title}</h3> : null}
      <div className="select" onClick={() => setIsOpen(!isOpen)}>
        {value || options[0]}
      </div>
      {isOpen && (
        <ul className="list select-options">
          {options.map((option, index) => (
            <li
              className={`select-option ${
                option === value ? "selected-option" : ""
              }`}
              key={index}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
