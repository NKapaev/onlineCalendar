import "./inputField.css";
import { capitalize } from "../helpers";
import { useState, forwardRef, useId } from "react";

export default forwardRef(function InputField(
  {
    label,
    required = false,
    type = "text",
    placeholder = "",
    errorMessage = "",
    value,
    onChange = (e) => {
      value = e.target.value;
    },
    className = "",
    disabled = false,
    ...props
  },
  ref
) {
  const [inputType, setInputType] = useState(type);
  const inputId = label ? label.toLowerCase().replace(/\s+/g, "-") : useId();
  return (
    <div
      className={`field-container ${className} ${disabled ? "disabled" : ""}`}
    >
      <label
        className={`input-label ${disabled ? "disabled" : ""}`}
        htmlFor={inputId}
      >
        {label ? capitalize(label) : ""}
        {required ? <span className="required">*</span> : ""}
      </label>
      <div className={`input-container ${errorMessage ? "error" : ""}`}>
        <input
          required={required}
          id={inputId}
          ref={ref}
          className="input"
          placeholder={placeholder}
          type={inputType}
          disabled={disabled}
          value={value}
          onChange={onChange}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className="password-button"
            onClick={() =>
              setInputType(inputType === "password" ? "text" : "password")
            }
          >
            <img
              src={
                inputType === "password"
                  ? "./icons/eye-close.svg"
                  : "./icons/eye-open.svg"
              }
              alt="Toggle password visibility"
            />
          </button>
        )}
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
});
