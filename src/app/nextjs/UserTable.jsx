'use client'; // Thông báo đây là client component

import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import useMounted from '@/hooks/useMounted';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from 'antd';

const UserTable = ({ data }) => {
  const { isMounted } = useMounted();
  const [isLoading, setIsLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    data && setIsLoading(false);
  }, [data]);

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
          <div className='flex justify-end p-[1rem]'>
            <Button type='primary' className='bg-blue-500 '>
              Create new
            </Button>
          </div>

          <Table
            loading={isLoading}
            onChange={onChange}
            rowKey={'id'}
            bordered
            dataSource={data}
            columns={columns}
            pagination={{
              pageSize: 5,
              total: 20,
            }}
          />
        </>
      ) : (
        'Loading...'
      )}
    </>
  );
};

export default UserTable;
