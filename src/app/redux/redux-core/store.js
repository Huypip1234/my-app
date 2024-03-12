import { applyMiddleware, createStore } from "redux";
import allReducers from "./reducer";
import { thunk } from "redux-thunk"; // Support for action return function instead of object

/* const middleware = (store) => {
  return (next) => {
    return (action) => {
      return next(action);
    };
  };
}; 
OR
*/
// Phải đi qua middle ware trước
const customMiddleware = (store) => (next) => (action) => {
  console.log({ store, next, action });
  if (action.payload === 2) {
    next({ type: action.type, payload: 1 });
    return;
  }
  next(action);
};

//3 tham số: reducer, initValue, enhance (middleware)
//neu truyen 2 tham so: reducer, enhance
export const store = createStore(allReducers, applyMiddleware(thunk));
