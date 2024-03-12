import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import store from "./store";
import rootReducer from "./reducer";

const SubReduxCore = () => {
  const counter = useSelector((state) => state.reducer1);
  const dispatch = useDispatch();

  return (
    <div className="form-container my-[1rem] flex flex-col items-center gap-[1rem] mt-[3rem]">
      <h1 className="text-[rgb(112,76,182)] text-[36px] font-[500]">
        Redux Toolkit
      </h1>
      <h4 className="text-[rgb(112,76,182)]">{counter}</h4>
      <div className="flex items-center gap-[1rem]">
        <Button
          className="!bg-[rgba(112,76,182,0.1)] !text-[rgb(112,76,182)]"
          onClick={() => {
            dispatch(rootReducer.actions.increment(5));
          }}
        >
          Increase
        </Button>
        <Button
          className="!bg-[rgba(112,76,182,0.1)] !text-[rgb(112,76,182)]"
          onClick={() => {
            dispatch(rootReducer.actions.decrement(5));
          }}
        >
          Decrease
        </Button>
      </div>
    </div>
  );
};

const ReduxToolKit = () => {
  return (
    <Provider store={store}>
      <SubReduxCore />
    </Provider>
  );
};

export default ReduxToolKit;
