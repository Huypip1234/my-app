"use client";

import React from "react";
import ReduxCore from "./redux-core/page";
import ReduxToolKit from "./redux-toolkit/page";

const page = () => {
  return (
    <div>
      <ReduxCore />
      <ReduxToolKit />
    </div>
  );
};

export default page;
