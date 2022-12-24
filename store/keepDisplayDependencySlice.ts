import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store";

export interface keepDisplayDependencyState {
  keepDisplayDependency: string[];
}

const initialState: keepDisplayDependencyState = {
  keepDisplayDependency: [],
};

export const keepDisplayDependencySlice = createSlice({
  name: "keepDisplayDependencySlice",
  initialState,
  reducers: {
    set_keepDisplayDependency(state, action:{type:string,payload:{type:"add" | "remove" , id:string}}) {
      // state.keepDisplayDependency = action.payload;
      const new_keepDisplayDependency = [...state.keepDisplayDependency];
      if(action.payload.type === "add"){
        new_keepDisplayDependency.push(action.payload.id);
        // state.keepDisplayDependency = new_keepDisplayDependency;
      }
      else if(action.payload.type === "remove"){
        const index = new_keepDisplayDependency.findIndex((id_index) => {
            return id_index === action.payload.id
        })
        if(index !== -1){
            new_keepDisplayDependency.splice(index,1)
        }
      }
      state.keepDisplayDependency = new_keepDisplayDependency;
      console.log("new_keepDisplayDependency",new_keepDisplayDependency)
    },
  },
});

export const { set_keepDisplayDependency } = keepDisplayDependencySlice.actions;

export const select_keepDisplayDependency = (state: AppState) => state.keepDisplayDependencySlice.keepDisplayDependency

export default keepDisplayDependencySlice.reducer