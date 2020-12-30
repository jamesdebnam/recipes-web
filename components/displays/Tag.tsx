import React from "react";
import s from "../../styles/components/displays/Tag.module.scss";

type TagProps = {
  name: string;
  icon?: React.ReactElement;
  className?: string;
};

const Tag = ({ name, icon, className = " " }: TagProps) => {
  return (
    <div className={[s.container, className].join(" ")}>
      <p>{name}</p>
      {icon && icon}
    </div>
  );
};

export default Tag;
