import { createSlice } from "@reduxjs/toolkit";
import { authApiSlice } from "../api/auth";
import type User from "../../interface/User";

const initialState = {} as User;

const topupSlice = createSlice({
  name: "AccountInfo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      authApiSlice.endpoints.getProfile.matchFulfilled,
      (_, action) => {
        return action.payload.data;
      },
    );
  },
});

// export const {} = topupSlice.actions;

export default topupSlice.reducer;
