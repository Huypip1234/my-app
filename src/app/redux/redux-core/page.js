import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { decreaseCount, increaseCount, printSomething } from "./actions";
import { store } from "./store";

const SubReduxCore = () => {
  const counter = useSelector((allState) => allState.counter);
  const something = useSelector((allState) => allState.printSomething);
  const dispatch = useDispatch();

  return (
    <div className="form-container my-[1rem] flex flex-col items-center gap-[1rem]">
      <h1 className="text-[rgb(112,76,182)] text-[36px] font-[500]">Redux</h1>
      <h4 className="text-[rgb(112,76,182)]">{counter}</h4>
      <div className="flex items-center gap-[1rem]">
        <Button
          className="!bg-[rgba(112,76,182,0.1)] !text-[rgb(112,76,182)]"
          onClick={() => {
            dispatch(increaseCount(1));
          }}
        >
          Increase
        </Button>
        <Button
          className="!bg-[rgba(112,76,182,0.1)] !text-[rgb(112,76,182)]"
          onClick={() => {
            dispatch(decreaseCount(1));
          }}
        >
          Decrease
        </Button>
        <Button
          className="!bg-[rgba(112,76,182,0.1)] !text-[rgb(112,76,182)]"
          onClick={() => {
            dispatch(printSomething());
          }}
        >
          Print something!
        </Button>
      </div>
      <h4 className="text-[rgb(112,76,182)]">{something}</h4>
    </div>
  );
};

const ReduxCore = () => {
  return (
    <Provider store={store}>
      <SubReduxCore />
    </Provider>
  );
};

export default ReduxCore;
