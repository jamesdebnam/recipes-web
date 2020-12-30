import React from "react";
import s from "../../styles/components/displays/ErrorMessage.module.scss";
import { FrownOutlined } from "@ant-design/icons";

type ErrorMessageProps = {
  error: string | null;
};

const ErrorMessage = ({ error }): React.ReactElement => {
  return error ? (
    <div className={s.container}>
      <FrownOutlined className={s.icon} />
      <p>{error}</p>
    </div>
  ) : null;
};

export default ErrorMessage;
