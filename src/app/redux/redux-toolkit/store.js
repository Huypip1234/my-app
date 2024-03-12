import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

const store = configureStore({
  //Giong combineReducer
  reducer: {
    reducer1: rootReducer.reducer,
  },
});

export default store;
