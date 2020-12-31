import React, { useState } from "react";
import s from "../styles/components/RecipeList.module.scss";
import useDataFetch from "./hooks/useDataFetch";
import SearchInput from "./inputs/SearchInput";
import SearchDropdown from "./inputs/SearchDropdown";
import ErrorMessage from "./displays/ErrorMessage";
import _ from "lodash";
import RecipeCard from "./displays/RecipeCard";
import { useSelector } from "react-redux";

export interface IRecipe extends Document {
  name: string;
  tags: string[];
  steps: string[];
  description: string;
  ingredients: IRecipeIngredient[];
  image: string;
  serves: number;
  author: string;
}

export interface IRecipeIngredient {
  name: string;
  number: number;
  unit: string;
  note: string;
}

const RecipeList = () => {
  const { loading, data, error } = useDataFetch("/recipes");
  const [tagFilters, setTagFilters] = useState([]);
  const [ingredientFilters, setIngredientFilters] = useState([]);
  const { cachedTags, cachedIngredients } = useSelector((state) => state.cache);
  function handleSearch(val: string): void {}

  function isInFilter(compareArray: string[], filterArray: string[]) {
    const unmatchingFilterItems = _.pullAll([...filterArray], compareArray);
    return unmatchingFilterItems.length === 0;
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
          setSelected={setTagFilters}
          dropdownItems={cachedTags}
          selected={tagFilters}
          placeholder="Filter by tags"
          loading={false}
          tabIndex={1}
        />
        <SearchDropdown
          setSelected={setIngredientFilters}
          dropdownItems={cachedIngredients}
          selected={ingredientFilters}
          placeholder="Filter by ingredients"
          loading={false}
          tabIndex={2}
          capitalize
        />
      </div>
      <ErrorMessage error={error ? error.message : null} />
      <div className={s.recipes}>
        {(data as IRecipe[])
          .filter(
            (item) =>
              isInFilter(item.tags, tagFilters) &&
              isInFilter(
                item.ingredients.map((item) => item.name),
                ingredientFilters
              )
          )
          .map((item) => (
            <RecipeCard data={item} />
          ))}
      </div>
    </div>
  );
};

export default RecipeList;
