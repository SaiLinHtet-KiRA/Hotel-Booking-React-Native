import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.stringify(localStorage.getItem("notification")) || {};

const gameSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
});

export const {} = gameSlice.actions;

export default gameSlice.reducer;
