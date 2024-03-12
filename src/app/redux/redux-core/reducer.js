import { combineReducers } from "redux";

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + action.payload;
    case "DECREMENT":
      return state - action.payload;
    default:
      return state;
  }
};

const printReducer = (state = "...", action) => {
  switch (action.type) {
    case "PRINT_SOMETHING":
      return action.payload;
    default:
      return state;
  }
};

//CombineReducers: Gộp các reducer lại.
const allReducers = combineReducers({
  counter: counterReducer,
  printSomething: printReducer,
  // Them cac reducer khac
});

export default allReducers;
