import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store";

export interface useSettingState {
  reloadTrigger: number;
}

const initialState: useSettingState = {
  reloadTrigger: 0,
};

export const useSettingSlice = createSlice({
  name: "useSettingSlice",
  initialState,
  reducers: {
    // Action to set the status
    set_useSettingState(state, action) {
      state.reloadTrigger = state.reloadTrigger + 1;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state: any, action: { payload: any; type: string }) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { set_useSettingState } = useSettingSlice.actions;

export const select_useSettingState = (state: AppState) => state.useSettingSlice.reloadTrigger;

export default useSettingSlice.reducer;

//The object notation for `createSlice.extraReducers` is deprecated, and will be removed in RTK 2.0. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice