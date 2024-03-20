import React, { useEffect, useState } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  useQueries,
} from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@material-ui/core';
import Link from 'next/link';

const Navigation = () => {
  const [page, setPage] = useState(1);

  // Access the client
  const queryClient = useQueryClient();

  // get from store
  const otherData = queryClient.getQueryData(['testBase']);
  // Ngoai ra:
  // getQueryCache(['']) => lay tat ca data trong cache
  // getQueriesData() => lay tat ca query
  // isFetching(['']) => kiem tra xem query co dang fetch ko
  // ...
  // Lấy đc cả data ở mutation (cứ truyền key là đc)
  useEffect(() => {
    console.log('other Data haha', otherData);
  }, [otherData]);

  // Queries
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['todos', page],
    retry: 1, // goi lai 1 lan neu bi loi (mac dinh 3 lan)
    retryDelay: 1000, // thoi gian giua cac lan goi lai
    refetchOnWindowFocus: true, // => khi focus vao tab thi se goi lai api (default true)
    gcTime: 5 * 60 * 1000, // thoi gian xoa cache: 5 phut (tinh bang miliseconds, default 5 phut)
    staleTime: 3000, // khoang thoi gian coi data hien tai la moi -> ko cho fetch lai data (default 0ms, infinity: luon la moi)
    enabled: true, // false => tat query ko cho fetch
    placeholderData: (prevData) => {
      console.log(prevData);
      return 'sadsad'; // Giữ nguyên UI khi refresh trang (đíu hiểu lắm)
    },
    queryFn: async (data) => {
      console.log('func data: ', data); // lay dc array queryKey ben tren
      return axios
        .get(`https://jsonplaceholder.typicode.com/posts/${data.queryKey[1]}`)
        .then((res) => res.data);
    },
  });

  if (isPending) return 'Pending...';

  if (error) return 'An error has occurred: ' + error.message;

  if (isFetching) {
    console.log('Fetching...');
  }

  return (
    <div className='form-container flex flex-col items-center my-[1rem] gap-[1rem]'>
      <h1 className='text-[rgb(244,63,94)] font-[600] text-[24px]'>
        Navigation
      </h1>
      <div className='flex items-center gap-[1rem]'>
        <Button
          onClick={() => {
            setPage((prev) => prev - 1);
          }}
          disabled={page === 1}
          className='!bg-[rgb(244,63,94)] !text-white'
        >
          Previous Page
        </Button>
        <Button
          onClick={() => {
            setPage((prev) => prev + 1);
          }}
          className='!bg-[rgb(244,63,94)] !text-white'
          disabled={isFetching} // => khi dang fetch thi ko cho click
        >
          Next Page
        </Button>
      </div>

      <div>
        {!isFetching ? (
          <ul>
            {/* {data?.map((todo) => ( */}
            <li key={data.id}>{data.title}</li>
            {/* ))} */}
          </ul>
        ) : (
          'Fetching...'
        )}
      </div>

      <div>
        <span className='text-red-500'>Data in Basic component: </span>{' '}
        {otherData?.map((todo) => todo.title)}
      </div>
    </div>
  );
};

export default Navigation;
