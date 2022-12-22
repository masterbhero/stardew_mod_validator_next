import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store";

export interface currentPageState {
  currentPage: string;
}

const initialState: currentPageState = {
  currentPage: "init",
};

export const currentPageSlice = createSlice({
  name: "currentPageSlice",
  initialState,
  reducers: {
    set_currentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { set_currentPage } = currentPageSlice.actions;

export const select_currentPageState = (state: AppState) => state.currentPageSlice.currentPage

export default currentPageSlice.reducer;