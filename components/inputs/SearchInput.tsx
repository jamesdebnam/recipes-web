import React, { useState } from "react";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import s from "../../styles/components/inputs/SearchInput.module.scss";
import Button from "../Button";

type SearchInputProps = {
  searchCb: (val: string) => void;
  loading: boolean;
  placeholder?: string;
  className?: string;
};

const SearchInput = ({
  placeholder = "",
  className = "",
  searchCb,
  loading,
}: SearchInputProps) => {
  const [textValue, setTextValue] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <div className={[s.container, className].join(" ")}>
      <input
        placeholder={placeholder}
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") searchCb(textValue);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={focused ? s.focused : ""}
      />
      <Button
        loading={loading}
        onClick={() => searchCb(textValue)}
        className={[s.button, focused ? s.focused : ""].join(" ")}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchInput;
