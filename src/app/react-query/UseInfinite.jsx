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
import Link from 'next/link';

const UseInfinite = () => {
  const [page, setPage] = useState(1);

  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const { isPending, error, data, isFetching } = useInfiniteQuery({
    queryKey: ['todos', page],
    queryFn: async ({ pageParam = 1 }) => {
      console.log('func data: ', data); // lay dc queryKey
      return axios
        .get(`https://jsonplaceholder.typicode.com/posts/${pageParam}`)
        .then((res) => res.data);
    },
    getNextPageParam: (lastPage, allPages) => {
      console.log('lastPage: ', lastPage);
      console.log('allPages: ', allPages);
      return lastPage.id;
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
        Use Infinite Query
      </h1>
      <Button onClick={() => {}} className='!bg-[rgb(244,63,94)] !text-white'>
        Load more
      </Button>
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
    </div>
  );
};

export default UseInfinite;
