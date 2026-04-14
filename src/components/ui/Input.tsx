import React from 'react';

import '../../index.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    helpText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, error, helpText, ...props }, ref) => {
    return (
        <div className="input-group input">
            <label>{label}</label>
            <input ref={ref} {...props} className={`input ${error ? 'input-error' : ''}`} />
            {error && <span className="error-text">{error}</span>}
            {helpText && <span className="help-text">{helpText}</span>}
        </div>
    );
});

export default Input;