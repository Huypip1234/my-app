import React, { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@material-ui/core';
import Link from 'next/link';

const Basic = () => {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['todos'],
    retry: 1, // goi lai 1 lan neu bi loi (mac dinh 3 lan)
    retryDelay: 1000, // thoi gian giua cac lan goi lai
    gcTime: 5 * 60 * 1000, // thoi gian xoa cache: 5 phut (tinh bang miliseconds, default 5 phut)
    refetchOnWindowFocus: true, // => khi focus vao tab thi se goi lai api (default true)
    queryFn: () =>
      axios.get('http://localhost:3002/todo').then((res) => res.data),
  });

  // Mutations;
  const mutation = useMutation({
    mutationFn: () =>
      axios // post api
        .get('https://jsonplaceholder.typicode.com/todos')
        .then((res) => res.data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  if (isPending) return 'Pending...';

  if (error) return 'An error has occurred: ' + error.message;

  if (isFetching) {
    console.log('Fetching...');
  }

  return (
    <div className='form-container flex flex-col items-center my-[1rem] gap-[1rem]'>
      <h1 className='text-[rgb(244,63,94)] font-[600] text-[36px]'>
        React Query
      </h1>
      <Link href='/react-query/cache-test' className='!text-[rgb(244,63,94)]'>
        Link
      </Link>
      <Button
        onClick={() => {
          mutation.mutate({
            id: Date.now(),
            title: 'Do Laundry',
          });
        }}
        className='!bg-[rgb(244,63,94)] !text-white'
      >
        Add Todo
      </Button>
      <div>
        {!isFetching ? (
          <ul>
            {data?.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        ) : (
          'Fetching...'
        )}
      </div>
    </div>
  );
};

export default Basic;
