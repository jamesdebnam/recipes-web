import React, { useState } from "react";
import s from "../styles/components/RecipeList.module.scss";
import useDataFetch from "./hooks/useDataFetch";
import SearchInput from "./inputs/SearchInput";
import SearchDropdown from "./inputs/SearchDropdown";
import ErrorMessage from "./displays/ErrorMessage";
import _ from "lodash";
import RecipeCard from "./displays/RecipeCard";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateUserData } from "../redux/authSlice";

export interface IRecipe extends Document {
  _id: string;
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
  const dispatch = useDispatch();
  const { loading, data, error } = useDataFetch("/recipes");
  const [tagFilters, setTagFilters] = useState([]);
  const [ingredientFilters, setIngredientFilters] = useState([]);
  const { cachedTags, cachedIngredients } = useSelector((state) => state.cache);
  const group = useSelector((state) => state.group);
  const userData = useSelector((state) => state.auth.userData);

  function handleSearch(val: string): void {}

  function isInFilter(compareArray: string[], filterArray: string[]) {
    const unmatchingFilterItems = _.pullAll([...filterArray], compareArray);
    return unmatchingFilterItems.length === 0;
  }

  function isInGroup(item: IRecipe) {
    if (group === "starred") {
      return userData.starredRecipes.includes(item._id);
    } else if (group === "personal") {
      return userData.recipes.includes(item._id);
    } else if (group === "all") {
      return true;
    } else {
      const customGroup = userData.customGroups.find(
        (item) => item.name === group
      );
      return customGroup.recipes.includes(item._id);
    }
  }

  async function handleStar(_id) {
    try {
      const prevStarred = { starredRecipes: userData.starredRecipes };
      if (userData.starredRecipes.includes(_id)) {
        const newStarred = {
          starredRecipes: userData.starredRecipes.filter(
            (item) => item !== _id
          ),
        };
        await sendStarRequest(newStarred, prevStarred);
      } else {
        const newStarred = {
          starredRecipes: [...userData.starredRecipes, _id],
        };
        await sendStarRequest(newStarred, prevStarred);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  async function sendStarRequest(data, prevData) {
    dispatch(updateUserData(data));
    const response = (await axios.patch(`/users/${userData._id}`, data)).data;
    if (response.status !== "ok") {
      dispatch(updateUserData(prevData));
      throw new Error(response.message);
    }
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
              isInGroup(item) &&
              isInFilter(item.tags, tagFilters) &&
              isInFilter(
                item.ingredients.map((item) => item.name),
                ingredientFilters
              )
          )
          .map((item) => (
            <RecipeCard
              key={item._id}
              data={item}
              starred={userData.starredRecipes?.includes(item._id)}
              sendStarRequest={() => handleStar(item._id)}
            />
          ))}
      </div>
    </div>
  );
};

export default RecipeList;
