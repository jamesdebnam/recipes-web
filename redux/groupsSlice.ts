import { createSlice, PayloadAction, Action } from "@reduxjs/toolkit";

const groupsSlice = createSlice({
  name: "settings",
  initialState: "all",
  reducers: {
    selectGroup: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

const { reducer, actions } = groupsSlice;
export const { selectGroup } = actions;
export default reducer;
