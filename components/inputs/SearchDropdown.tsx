import React, { useState } from "react";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import s from "../../styles/components/inputs/SearchDropdown.module.scss";

type SearchDropdownProps = {
  selectCb: (val: string) => void;
  dropdownItems: string[];

  loading: boolean;
  placeholder?: string;
  className?: string;
  selected?: string[];
};

const SearchDropdown = ({
  placeholder = "",
  className = "",
  selectCb,
  loading,
  dropdownItems,
  selected = [],
}: SearchDropdownProps) => {
  const [textValue, setTextValue] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={[s.container, className].sca()}
      tabIndex={1}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(true)}
    >
      <input
        placeholder={placeholder}
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") selectCb(textValue);
        }}
        className={focused ? s.focused : ""}
      />
      <div
        className={focused ? [s.dropdown, s.dropdownFocused].sca() : s.dropdown}
      >
        {dropdownItems.map((item) => (
          <option>{item}</option>
        ))}
      </div>
    </div>
  );
};

export default SearchDropdown;
