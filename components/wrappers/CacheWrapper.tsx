import React, { useEffect } from "react";
import { Store } from "redux";
import { addToCacheArray } from "../../redux/cacheSlice";
import useDataFetch from "../hooks/useDataFetch";

type CacheWrapperProps = {
  children: React.ReactNode;
  store: Store;
};

const CacheWrapper = ({
  children,
  store,
}: CacheWrapperProps): React.ReactNode => {
  const tags = useDataFetch("/tags", (data) =>
    store.dispatch(
      addToCacheArray({
        data: data.map((item) => item.name),
        prop: "cachedTags",
      })
    )
  );
  const ingredients = useDataFetch("/ingredients", (data) =>
    store.dispatch(
      addToCacheArray({
        data: data.map((item) => item.name),
        prop: "cachedIngredients",
      })
    )
  );
  useEffect(() => {
    if (tags.error) console.log("Tags fetch error:", tags.error);
    if (ingredients.error)
      console.log("Ingredients fetch error:", ingredients.error);
  }, [tags.error, ingredients.error]);
  return children;
};

export default CacheWrapper;
