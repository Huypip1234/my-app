import { createSlice } from "@reduxjs/toolkit";

const rootReducer = createSlice({
  name: "rootReducer",
  initialState: 0,
  //Viet theo kieu mutation
  //name/reducers -> vd: rootReducer/INCREMENT
  //tu dong tao file action -> ko phai cau hinh file action nua
  reducers: {
    increment: (state, action) => {
      state = state + action.payload;
      return state;
    },
    decrement: (state, action) => {
      state = state - action.payload;
      return state;
    },
  },
});

export default rootReducer;
