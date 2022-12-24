import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { useSettingSlice } from "./useSettingSlice";
import { createWrapper } from "next-redux-wrapper";
import { currentPageSlice } from "./currentPageSlice";
import { keepDisplayDependencySlice } from "./keepDisplayDependencySlice";

const makeStore = () =>
  configureStore({
    reducer: {
      [useSettingSlice.name]: useSettingSlice.reducer,
      [currentPageSlice.name]: currentPageSlice.reducer,
      [keepDisplayDependencySlice.name]: keepDisplayDependencySlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);