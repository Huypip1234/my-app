import React, { useEffect, useState } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  useQueries,
  useInfiniteQuery,
} from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@material-ui/core';

const UseInfinite = () => {
  // Queries
  const {
    error,
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage, // => check xem con trang tiep theo ko (true/false)
  } = useInfiniteQuery({
    queryKey: ['myPost'],
    queryFn: async (data) => {
      return axios
        .get(`https://jsonplaceholder.typicode.com/posts/${data.pageParam}`)
        .then((res) => res.data);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      console.log('lastPage: ', lastPage);
      console.log('allPages: ', allPages);
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
    // getPreviousPageParam // -> lay thang page truoc va cho len dau (dung trong load messager)
  });

  //   if (isPending) return 'Pending...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className='form-container flex flex-col items-center my-[1rem] gap-[1rem]'>
      <h1 className='text-[rgb(244,63,94)] font-[600] text-[24px]'>
        Use Infinite Query
      </h1>
      <Button
        onClick={() => {
          fetchNextPage();
          // fetchNextPage({ pageParam: 50 }); // -> lay thang page 50
        }}
        className='!bg-[rgb(244,63,94)] !text-white'
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage ? 'Loading more...' : 'Load More'}
      </Button>
      <div>
        {!isLoading ? (
          <ul>
            {data?.pages?.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        ) : (
          'Loading...'
        )}
        {!hasNextPage && 'No more data'}
      </div>
    </div>
  );
};

export default UseInfinite;
