import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  Action,
} from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";

interface IUserData {
  firstName: string;
  lastName: string;
  email: string;
  recipes: string[];
}

interface authInitialState {
  isLoggedIn: boolean;
  userData: IUserData | {};
}

const initialState: authInitialState = {
  isLoggedIn: false,
  userData: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUserData>) => {
      state.userData = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state, action: Action) => {
      state.userData = {};
      state.isLoggedIn = false;
    },
    updateUserData: (state, action: PayloadAction<object>) => {
      state.userData = { ...state.userData, ...action.payload };
    },
  },
});

const { reducer, actions } = authSlice;
export const { login, logout, updateUserData } = actions;
export default reducer;
