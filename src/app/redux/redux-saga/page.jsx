import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { decreaseCount, increaseCount, printSomething } from "./actions";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

const SubReduxSaga = () => {
  const counter = useSelector((allState) => allState.counter);
  const something = useSelector((allState) => allState.printSomething);
  const dispatch = useDispatch();

  /* useEffect(() => {
    console.log(something);
  }, [something]); */

  return (
    <div className="form-container my-[1rem] flex flex-col items-center gap-[1rem]">
      <h1 className="text-[#86d46b] text-[36px] font-[500]">Redux Saga</h1>
      <h4 className="text-[#86d46b]">{counter}</h4>
      <div className="flex items-center gap-[1rem]">
        <Button
          className="!bg-[#ebedf0] !text-[#86d46b]"
          onClick={() => {
            dispatch(increaseCount(1));
          }}
        >
          Increase
        </Button>
        <Button
          className="!bg-[#ebedf0] !text-[#86d46b]"
          onClick={() => {
            dispatch(decreaseCount(1));
          }}
        >
          Decrease
        </Button>
        <Button
          className="!bg-[#ebedf0] !text-[#86d46b]"
          onClick={() => {
            dispatch(printSomething());
          }}
        >
          Print something!
        </Button>
      </div>
      <h4 className="text-[#86d46b]">{something}</h4>
    </div>
  );
};

const ReduxSaga = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SubReduxSaga />
      </PersistGate>
    </Provider>
  );
};

export default ReduxSaga;
