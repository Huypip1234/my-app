"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";

const Redux = () => {
  return (
    <Provider store={store}>
      <div>page</div>
    </Provider>
  );
};

export default Redux;
