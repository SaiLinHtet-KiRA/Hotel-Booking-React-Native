import { createSlice } from "@reduxjs/toolkit";
import { authApiSlice } from "../api/auth";
import type User from "../../interface/User";

const initialState = {} as User;

const topupSlice = createSlice({
  name: "AccountInfo",
  initialState,
  reducers: {
    clearUser: () => initialState,
  },
  extraReducers(builder) {
    builder.addMatcher(
      authApiSlice.endpoints.Login.matchFulfilled,
      (_, action) => {
        return action.payload.data as User;
      },
    );
    builder.addMatcher(
      authApiSlice.endpoints.getProfile.matchFulfilled,
      (_, action) => {
        return action.payload.data;
      },
    );
  },
});

export const { clearUser } = topupSlice.actions;

export default topupSlice.reducer;
