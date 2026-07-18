import { type AccountInfo } from "@/interface/User";
import { createSlice } from "@reduxjs/toolkit";
import { authApiSlice } from "../api/auth";

const initialState = {} as AccountInfo;

const topupSlice = createSlice({
  name: "AccountInfo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      authApiSlice.endpoints.getAccountInfo.matchFulfilled,
      (_, action) => {
        return action.payload;
      },
    );
  },
});

export const {} = topupSlice.actions;

export default topupSlice.reducer;
