import React from 'react';
import UserTable from './UserTable';
import axios from 'axios';

export const userData = () => {
  return axios.get('https://jsonplaceholder.typicode.com/users');
};
// Server component
const NextJs = async (props) => {
  // Nếu ko có use client thì console.log sẽ hiện ở  dưới terminal này luôn (chỉ chạy ở server)
  // Nếu có use client thì console.log sẽ hiện ở trình duyệt (chỉ chạy ở client)
  console.log(props);
  // props = {params: {}, searchParams: {}} -> Ko cần useParams, searchParm

  // nextjs 14 tự caching data ở server
  // Phải reload mới lấy đc data mới
  const res = await userData();
  const data = res.data;

  return (
    <div>
      <UserTable data={data ? data : []} />
    </div>
  );
};

export default NextJs;
