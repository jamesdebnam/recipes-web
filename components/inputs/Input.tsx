import React, { useEffect, useState } from "react";
import s from "../../styles/components/inputs/Input.module.scss";

type InputProps = {
  placeholder: string;
  value: string;
  setValue: (val: string) => void;
  setIsValidated: (val: boolean) => void;
  required?: boolean;
  validationCb?: (val: string) => string;
  label?: string;
  type?: string;
  className?: string;
};

const Input = ({
  placeholder,
  label,
  value,
  setValue,
  className,
  required,
  validationCb,
  setIsValidated,
  type = "text",
}: InputProps) => {
  const [validationError, setValidationError] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  function handleValidation() {
    if (required && value === "") {
      setIsValidated(false);
      return setValidationError("This field is required");
    } else if (validationCb && validationCb(value)) {
      setIsValidated(false);
      return setValidationError(validationCb(value));
    } else {
      setIsValidated(true);
      return setValidationError("");
    }
  }

  useEffect(() => {
    if (isTouched) {
      handleValidation();
    }
  }, [value]);

  return (
    <div className={s.container}>
      {label && <p className={s.label}>{label}</p>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onFocus={() => setIsTouched(true)}
        onBlur={handleValidation}
        onChange={(e) => setValue(e.target.value)}
        className={className ? [className, s.input].join(" ") : s.input}
      />
      {validationError && (
        <p className={label ? [s.error, s.shiftedError].join(" ") : s.error}>
          {validationError}
        </p>
      )}
    </div>
  );
};

export default Input;
