import React, { useState } from "react";
import s from "../styles/components/RecipeList.module.scss";
import useDataFetch from "./hooks/useDataFetch";
import SearchInput from "./inputs/SearchInput";
import SearchDropdown from "./inputs/SearchDropdown";

const testTags = ["tasty", "yummy", "juicy", "chinese"];

const RecipeList = () => {
  // const { loading, data, sendNewRequest, error } = useDataFetch("/recipes");
  const [loading, setLoading] = useState(false);
  function handleSearch(val: string): void {
    setLoading(!loading);
  }

  return (
    <div className={s.container}>
      <div className={s.filters}>
        <SearchInput
          searchCb={handleSearch}
          loading={loading}
          placeholder="Search for recipes"
        />
        <SearchDropdown
          selectCb={() => {}}
          dropdownItems={testTags}
          loading={false}
        />
      </div>
    </div>
  );
};

export default RecipeList;
