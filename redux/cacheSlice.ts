import { createSlice, PayloadAction, Action } from "@reduxjs/toolkit";
import _ from "lodash";

interface cacheInitialState {
  cachedTags: string[];
  cachedIngredients: string[];
  cachedUsers: object;
}

const initialState: cacheInitialState = {
  cachedTags: [],
  cachedIngredients: [],
  cachedUsers: {},
};

interface ICacheArrReducer {
  prop: string;
  data: string[];
}

interface ICacheObjReducer {
  prop: string;
  data: ICachedUser;
}

interface ICachedUser {
  firstName: string;
  lastName: string;
  _id: string;
}

const cacheSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    addToCacheArray: (state, action: PayloadAction<ICacheArrReducer>) => {
      const { prop, data } = action.payload;
      state[prop] = _.uniq([...state[prop], ...data]);
    },
    addToCacheObject: (state, action: PayloadAction<ICacheObjReducer>) => {
      const { prop, data } = action.payload;
      const { firstName, lastName, _id } = data;
      state[prop][_id] = { firstName, lastName };
    },
  },
});

const { reducer, actions } = cacheSlice;
export const { addToCacheArray, addToCacheObject } = actions;
export default reducer;
