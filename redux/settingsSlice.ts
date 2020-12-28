import { createSlice, PayloadAction, Action } from "@reduxjs/toolkit";

interface settingsInitialState {}

const initialState: settingsInitialState = {};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
});

const { reducer, actions } = settingsSlice;
export const {} = actions;
export default reducer;
