'use client';

import React, { useEffect, useState } from 'react';
import { axiosClient, responseInterceptorData } from './config';
import { Button } from '@material-ui/core';

const Axios = () => {
  const [data, setData] = useState([]);
  const fetchDataNoInterceptor = async () => {
    // Remove interceptor
    axiosClient.interceptors.request.eject(responseInterceptorData);
    try {
      const res = await axiosClient.get('/todos/1');
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataWithInterceptor = async () => {
    try {
      const res = await axiosClient.get('/todos/1');
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataNoInterceptor();
  }, []);

  return (
    <div className='form-container my-[1rem] flex flex-col items-center gap-[1rem]'>
      <h1 className='text-[#671ddf] text-[36px] font-[600]'>Axios</h1>
      <Button
        className='!bg-[#671ddf] !text-[white]'
        onClick={fetchDataWithInterceptor}
      >
        Fetch Again!
      </Button>
      <p>{data?.title || '...'}</p>
    </div>
  );
};

export default Axios;
