'use client';

import { Button } from '@material-ui/core';
import React from 'react';
import useStore from './store';

const Zustand = () => {
  const { count, increase } = useStore();

  return (
    <div className='layout-container'>
      <div className='form-container flex flex-col items-center gap-[1rem]'>
        <h1 className='text-[#2459ca] text-[36px] font-[600]'>Zustand</h1>
                <span className='text-[#2459ca]'>{count}</span>
        <Button className='!bg-[#2459ca] !text-white' onClick={increase}>
          one up
        </Button>
      </div>
    </div>
  );
};

export default Zustand;
