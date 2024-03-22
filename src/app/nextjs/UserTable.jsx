'use client'; // Thông báo đây là client component

import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import useMounted from '@/hooks/useMounted';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from 'antd';
import axios from 'axios';

// Chỉ hỗ trợ ở page router -> Viết vô cho biết
export async function getServerSideProps(context) {
  console.log(context);
  const { id } = context.query;
  const data = await fetch(`http://localhost:3002/todo/${id}`);
  const post = await data.json();

  return {
    props: {
      post: post,
    },
  };
}

const UserTable = ({ userData, action, todoData }) => {
  const { isMounted } = useMounted();
  const [isLoading, setIsLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    userData && setIsLoading(false);
  }, [userData]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
    },
  ];
  const onChange = (pagination) => {
    // pagination = {current: 1, pageSize: 5, total: 20}
    router.push(pathname + '?id=' + pagination.current);
    // -> server component bên kia tự lấy api lại vì đc render lại
    // kiến thức cũ: component render -> tất cả chạy lại, mỗi state giữ nguyên
  };

  return (
    <>
      {isMounted ? (
        <>
          <div className='flex justify-end p-[1rem] gap-[0.5rem]'>
            <Button
              onClick={async () => {
                await axios.post('http://localhost:3002/todo', {
                  id: Math.floor(Math.random() * 100) + 1 + '',
                  title: 'New todo',
                  view: 0,
                });
                action();
              }}
              type='primary'
              className='bg-blue-500 '
            >
              Create new
            </Button>
            <Button
              onClick={async () => {
                await axios.delete(
                  `http://localhost:3002/todo/${todoData[todoData.length - 1].id}`
                );
                action();
              }}
              type='primary'
              className='bg-red-500 '
            >
              Delete
            </Button>
            <Button
              onClick={async () => {
                action();
              }}
              type='primary'
              className='bg-green-500 '
            >
              Revalidate
            </Button>
          </div>

          <Table
            loading={isLoading}
            onChange={onChange}
            rowKey={'id'}
            bordered
            dataSource={userData}
            columns={columns}
            pagination={{
              pageSize: 5,
              total: 20,
            }}
          />
        </>
      ) : (
        'Mounting Antd...'
      )}
      <h2>TODO DATA</h2>
      {JSON.stringify(todoData)}
    </>
  );
};

export default UserTable;
