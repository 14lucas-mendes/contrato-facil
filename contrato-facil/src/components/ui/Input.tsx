import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helpText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helpText, className = "", ...props }, ref) => {
    const inputClassName = [
      "input-field",
      error ? "input-error" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="input-group">
        <label>{label}</label>
        <input ref={ref} {...props} className={inputClassName} />
        {error && <span className="error-text">{error}</span>}
        {helpText && <span className="help-text">{helpText}</span>}
      </div>
    );
  },
);

export default Input;
