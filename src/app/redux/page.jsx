'use client';

import React from 'react';
import ReduxCore from './redux-core/page';
import ReduxToolKit from './redux-toolkit/page';
import ReduxSaga from './redux-saga/page';

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
