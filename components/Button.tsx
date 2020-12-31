import React from "react";
import s from "../styles/components/Button.module.scss";
import { LoadingOutlined } from "@ant-design/icons";

type ButtonProps = {
  children: string | React.ReactNode;
  onClick: () => void;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
};

const Button = ({
  onClick,
  children,
  disabled = false,
  loading = false,
  className = "",
}: ButtonProps) => {
  return (
    <button
      className={[s.button, className, disabled ? s.disabled : ""].join(" ")}
      onClick={disabled ? () => {} : onClick}
    >
      <div
        className={
          loading ? [s.content, s.contentLoading].join(" ") : s.content
        }
      >
        {children}
      </div>

      <LoadingOutlined
        className={loading ? [s.icon, s.iconActive].join(" ") : s.icon}
      />
    </button>
  );
};

export default Button;
