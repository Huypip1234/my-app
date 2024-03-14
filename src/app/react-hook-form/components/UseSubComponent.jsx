import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const Input = ({ ...props }) => (
  <>
    <input {...props} />
  </>
);

const Select = ({ ...props }) => {
  useEffect(() => {
    console.log(props);
  }, [props]);
  return (
    <>
      <select {...props}>
        <option value='20'>20</option>
        <option value='30'>30</option>
      </select>
    </>
  );
};

const UseSubComponent = () => {
  const { register, handleSubmit } = useForm();
  const [status, setStatus] = useState('...');

  const onSubmit = (data) => {
    setStatus(JSON.stringify(data));
  };

  return (
    <div className='mt-[3rem]'>
      <form onSubmit={handleSubmit(onSubmit)} className='form-container'>
        <input // dùng đc vì nằm trong form -> có ref
          className='block w-full p-2 border rounded mt-3'
          {...register('Name')}
        />
        <Input // đíu dùng đc -> phải có ref forward sang component con
          placeholder='Name'
          className='block w-full p-2 border rounded mt-3'
          {...register('Name')}
        />
        <Select // đíu dùng đc -> phải có ref forward sang component con
          placeholder='Age'
          className='block w-full p-2 border rounded mt-3'
          {...register('Age')}
        />
        <input
          className='block w-full p-2 mt-3 bg-[#ec5990] text-white rounded cursor-pointer hover:bg-[#bf1650]'
          type='submit'
        />
      </form>
      {/* Status */}
      <div className='mt-[3rem]'>{status}</div>
    </div>
  );
};

export default UseSubComponent;
