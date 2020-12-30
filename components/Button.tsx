import React from "react";
import s from "../styles/components/Button.module.scss";
import { LoadingOutlined } from "@ant-design/icons";

type ButtonProps = {
  children: string | React.ReactNode;
  onClick: () => void;
  loading?: boolean;
  className?: string;
  icon?: React.ReactElement;
};

const Button = ({
  onClick,
  children,
  loading = false,
  className = "",
}: ButtonProps) => {
  return (
    <button className={[s.button, className].join(" ")} onClick={onClick}>
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
