import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import userReducer from "./features/user";

import { type TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
  },
  preloadedState: {},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: true,
});

export const Dispatch = typeof store.dispatch;
export type storeState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<storeState> = useSelector;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export default store;
