'use server';

import React from 'react';
import UserTable from './UserTable';
import { revalidateTag } from 'next/cache';

export async function action() {
  revalidateTag('todo');
}

// Server component
// Nếu ko có use client thì console.log sẽ hiện ở  dưới terminal này luôn (chỉ chạy ở server - server component)
// Nếu có use client thì console.log sẽ hiện ở trình duyệt (chỉ chạy ở client - client component)
const NextJs = async (props) => {
  const fetchUserData = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${props.searchParams.id}`,
      {
        method: 'GET',
        next: { tags: ['user'], revalidate: 5 },
      }
    );
    const data = await res.json();
    return data;
  };
  const userData = await fetchUserData();

  const fetchTodoData = async () => {
    const res = await fetch(`http://localhost:3002/todo`, {
      method: 'GET',
      next: { tags: ['todo'], revalidate: 5 },
      // cache: 'no-store',
    });
    const data = await res.json();
    return data;
  };
  const todoData = await fetchTodoData();

  // console.log(props);
  // props = {params: {}, searchParams: {}} -> Đây là props của page -> Ko cần useParams, searchParm

  // nextjs 14 tự caching data ở server

  return (
    <div>
      <UserTable
        action={action}
        todoData={todoData ? todoData : []}
        userData={userData ? userData : []}
      />
    </div>
  );
};

export default NextJs;

// export const revalidate = 5; // Revalidate page sau 5s áp dụng toàn bộ API
