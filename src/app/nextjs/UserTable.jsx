'use client'; // Thông báo đây là client component

import React from 'react';
import { Table } from 'antd';
import useMounted from '@/hooks/useMounted';

const UserTable = ({ data }) => {
  const { isMounted } = useMounted();
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
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
  ];
  return (
    <>
      {isMounted && (
        <Table key={'id'} bordered dataSource={data} columns={columns} />
      )}
    </>
  );
};

export default UserTable;
