import "./checkbox.css";
import { forwardRef, useState, useId } from "react";

export default forwardRef(function Checkbox(
  {
    className = "",
    text = "",
    isChecked = false,
    name = "",
    id = "",
    color,
    ...props
  },
  ref
) {
  const [checked, setChecked] = useState(isChecked);
  const generatedId = useId();
  const inputId = id || generatedId;

  const handleChange = () => {
    setChecked((prevChecked) => !prevChecked);
  };

  const indicatorStyles = {
    borderColor: color,
    backgroundColor: checked ? color : null,
  };

  return (
    <label className={`checkbox ${className}`}>
      <input
        className="checkbox-input visually-hidden"
        type="checkbox"
        name={name}
        id={inputId}
        color={color}
        checked={checked}
        onChange={handleChange}
        ref={ref}
        {...props}
      />
      <span className="checkbox-indicator" style={indicatorStyles}></span>
      {text && <span className="checkbox-text">{text}</span>}
    </label>
  );
});
