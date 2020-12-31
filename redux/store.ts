import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import cacheSlice from "./cacheSlice";
import groupsSlice from "./groupsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cache: cacheSlice,
    group: groupsSlice,
  },
});
