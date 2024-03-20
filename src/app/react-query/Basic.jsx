import React, { useEffect } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  useQueries,
} from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@material-ui/core';
import Link from 'next/link';

const Basic = () => {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['testBase'],
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
      console.log('func data: ', data); // lay dc queryKey
      return axios.get('http://localhost:3002/todo').then((res) => res.data);
    },
  });

  // // Queries: Nhieu Query
  // const queries = useQueries({
  //   // => tra ve 1 array cac query
  //   queries: [
  //     {
  //       queryKey: ['todos'],
  //       queryFn: () =>
  //         axios
  //           .get('https://jsonplaceholder.typicode.com/todos')
  //           .then((res) => res.data),
  //     },
  //     {
  //       queryKey: ['todos2'],
  //       queryFn: () =>
  //         axios
  //           .get('https://jsonplaceholder.typicode.com/todos')
  //           .then((res) => res.data),
  //     },
  //   ],
  //   // option
  //   combine: (data) => {
  //     // => gop cac data lai thanh 1 object tuy chinh
  //     return {
  //       data: data.map((d) => d.data),
  //       isPending: data.map((d) => d.isPending),
  //     };
  //   },
  // });

  // useEffect(() => {
  //   console.log('queries', queries);
  // }, [queries]);

  // Mutations;
  const mutation = useMutation({
    mutationFn: () =>
      axios // post api
        .post('http://localhost:3002/todo', {
          id: Math.random() * 1000,
          title: 'a titleđ',
          views: 100,
        })
        .then((res) => res.data),
    onSuccess: () => {
      console.log('onSuccess');
    },
    onError: (error) => {
      console.log('onError', error);
    },
    onSettled: (data, error) => {
      // => chay sau khi onSuccess hoac onError (giong finally)
      queryClient.invalidateQueries({ queryKey: ['testBase'] });
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
        Post
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
