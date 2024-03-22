'use client';

import React from 'react';
import ReduxCore from './redux-core';
import ReduxToolKit from './redux-toolkit';
import ReduxSaga from './redux-saga';

const page = () => {
  return (
    <div>
      <ReduxCore />
      <ReduxToolKit />
      <ReduxSaga />
    </div>
  );
};

export default page;
