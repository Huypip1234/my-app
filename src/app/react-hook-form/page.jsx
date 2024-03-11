"use client";

import React from "react";
import Basic from "./components/Basic";
import UseSubComponent from "./components/UseSubComponent";
import UseUiLib from "./components/UseUiLib";

const ReactHookForm = () => {
  // Đánh giá: Khó dùng vcl
  return (
    <div className="layout-container">
      <h1 className="text-[#ec5990] font-[600] text-[32px] text-center">
        Hooks Form
      </h1>
      <Basic />
      <UseSubComponent />
      <UseUiLib />
    </div>
  );
};

export default ReactHookForm;
