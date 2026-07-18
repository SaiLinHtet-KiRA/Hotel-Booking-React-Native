import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import userReducer from "./features/user";
// import socketReducer from "./features/socket/socket";
// import topupReducer from "./features/topup";
// import rechargeReducer from "./features/recharge";
// import gameReducer from "./features/game";
// import statusRechargeReducer from "./features/statusRecharge";
// import topupAdapter from "./features/adapter/Topup";
// import HistroyAdapter from "./features/adapter/history";

import { type TypedUseSelectorHook, useSelector } from "react-redux";
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
    // histroy: HistroyAdapter,
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
export default store;
