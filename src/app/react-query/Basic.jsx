import React, { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@material-ui/core';

const Basic = () => {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['todos'],
    queryFn: () =>
      axios
        .get('https://jsonplaceholder.typicode.com/todos')
        .then((res) => res.data),
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

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className='form-container flex flex-col items-center my-[1rem] gap-[1rem]'>
      <h1 className='text-[rgb(244,63,94)] font-[600] text-[36px]'>
        React Query
      </h1>
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
