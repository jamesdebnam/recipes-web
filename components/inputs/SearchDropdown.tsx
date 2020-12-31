import React, { useEffect, useState } from "react";
import {
  CloseOutlined,
  CloseSquareOutlined,
  LoadingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import s from "../../styles/components/inputs/SearchDropdown.module.scss";
import Tag from "../displays/Tag";

type SearchDropdownProps = {
  setSelected: (val: string[]) => void;
  dropdownItems: string[];
  tabIndex: number;
  loading: boolean;
  selected: string[];
  placeholder?: string;
  className?: string;
  capitalize?: boolean;
};

const SearchDropdown = ({
  placeholder = "",
  className = "",
  setSelected,
  loading,
  dropdownItems,
  selected,
  tabIndex,
  capitalize = false,
}: SearchDropdownProps) => {
  const [textValue, setTextValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [displayedItems, setDisplayedItems] = useState(dropdownItems);
  const [dropdownHeight, setDropdownHeight] = useState(10);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (textValue === "") {
      setDisplayedItems(dropdownItems);
    } else {
      const newDisplayedItems = displayedItems.filter((item) =>
        item.includes(textValue.toLowerCase())
      );
      setDisplayedItems(newDisplayedItems);
    }
  }, [textValue]);

  useEffect(() => {
    const itemCount = displayedItems.length;
    const isEmpty = itemCount === 0;
    setIsEmpty(isEmpty);
    if (itemCount === 2) {
      setDropdownHeight(7);
    } else if (itemCount < 2) {
      setDropdownHeight(4);
    } else {
      setDropdownHeight(10);
    }
  }, [selected, dropdownItems, displayedItems]);

  function handleBackspace(e) {
    if (e.key === "Backspace" && textValue === "" && selected.length > 0) {
      const newSelected = selected.slice(0, selected.length - 1);
      setSelected(newSelected);
    }
  }

  function handleSelect(item) {
    const newSelected = [...selected, item];
    console.log(newSelected);
    setSelected(newSelected);
    setTextValue("");
  }

  return (
    <div
      className={[s.container, className].join(" ")}
      tabIndex={tabIndex}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <div className={focused ? [s.input, s.focused].join(" ") : s.input}>
        {selected.map((item) => (
          <Tag
            name={item}
            icon={
              <CloseOutlined
                onClick={() => {
                  setFocused(false);
                  setSelected(selected.filter((value) => value !== item));
                }}
                className={s.closeIcon}
              />
            }
          />
        ))}
        <input
          placeholder={selected.length < 1 ? placeholder : ""}
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          onKeyDown={handleBackspace}
        />
      </div>
      {focused && (
        <div
          className={
            focused ? [s.dropdown, s.dropdownFocused].join(" ") : s.dropdown
          }
          style={{ height: `${dropdownHeight}rem` }}
        >
          {displayedItems.map((item) => (
            <option
              key={item}
              onClick={() => handleSelect(item)}
              style={{
                textTransform: capitalize ? "capitalize" : "lowercase",
              }}
            >
              {item}
            </option>
          ))}
          {isEmpty && <option>No items found...</option>}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
