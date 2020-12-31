import { createSlice, PayloadAction, Action } from "@reduxjs/toolkit";

interface groupsInitialState {
  isCustomGroup: boolean;
  group: string;
}

const initialState: groupsInitialState = {
  isCustomGroup: false,
  group: "all",
};

const STANDARD_GROUPS = ["starred", "personal", "all"];
const groupsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    selectGroup: (state, action: PayloadAction<string>) => {
      state.isCustomGroup = !STANDARD_GROUPS.includes(action.payload);
      state.group = action.payload;
    },
  },
});

const { reducer, actions } = groupsSlice;
export const { selectGroup } = actions;
export default reducer;
