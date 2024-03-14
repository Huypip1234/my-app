import { Input } from '@material-ui/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

const UseUiLib = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      select: {},
    },
  });
  const onSubmit = (data) => console.log(data);
  return (
    <form
      className='form-container mt-[3rem]'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name='select'
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={[
              { value: 'chocolate', label: 'Chocolate' },
              { value: 'strawberry', label: 'Strawberry' },
              { value: 'vanilla', label: 'Vanilla' },
            ]}
          />
        )}
      />
      <Controller
        name='firstName'
        control={control}
        render={({ field }) => <Input {...field} />}
      />
      <input type='submit' className='block' />
    </form>
  );
};

export default UseUiLib;
