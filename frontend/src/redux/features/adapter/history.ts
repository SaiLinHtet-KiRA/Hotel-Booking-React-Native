import { authApiSlice } from "@/redux/api/auth";
import { type storeState } from "@/redux/store";
import { createEntityAdapter, createSlice, isAnyOf } from "@reduxjs/toolkit";

const HistroyAdapter = createEntityAdapter({
  selectId: (state: any) => state._id,
});

const histroySlice = createSlice({
  name: "history-adapter",
  initialState: HistroyAdapter.getInitialState({
    isLoading: true,
  }),
  reducers: {
    addHistroy: HistroyAdapter.addOne,
    removeAllHistroy: (state) => {
      state.isLoading = true;
      HistroyAdapter.removeAll(state);
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      isAnyOf(authApiSlice.endpoints.getHistory.matchFulfilled),
      (state, action) => {
        state.isLoading = false;
        HistroyAdapter.setMany(state, action.payload.data);
      },
    );
    // builder.addMatcher(
    //   isAnyOf(authApiSlice.endpoints.getHistory.matchFulfilled),
    //   (state, action) => {
    //     HistroyAdapter.updateOne(state, {
    //       id: action.payload._id,
    //       changes: { ...action.payload },
    //     });
    //   },
    // );
  },
});

export const { addHistroy, removeAllHistroy } = histroySlice.actions;
export const histroySelectors = HistroyAdapter.getSelectors(
  (state: storeState) => state.histroy,
);
export default histroySlice.reducer;
