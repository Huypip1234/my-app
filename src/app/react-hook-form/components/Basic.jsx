import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import useMounted from "@/hooks/useMounted";

// required
// min
// max
// minLength
// maxLength
// pattern
// validate

const Basic = () => {
  const [status, setStatus] = useState("...");
  const { isMounted } = useMounted();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => setStatus(JSON.stringify(data));

  // watch input value by passing the name of it
  useEffect(() => {
    setStatus(watch("email"));
  }, [watch("email")]);

  useEffect(() => {
    console.log(errors.email), [errors];
  });

  return (
    <>
      {/* Hook form tool */}
      {isMounted && <DevTool control={control} />}

      <form
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-white rounded shadow-md"
      >
        <input
          defaultValue="test"
          placeholder="Email"
          {...register("email", {
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
          // đăng kí theo dõi trường với tên là example
          // ... để truyền tất cả ref, onChange, onBlur, name,... vào hook form
          className="block w-full p-2 border rounded mt-3"
        />
        {errors.email && <span className="text-red-500">Invalid</span>}

        <select
          {...register("gender")}
          className="block w-full p-2 border rounded mt-3"
        >
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select>

        <input
          placeholder="Password"
          {...register("password", { required: true, min: 18, max: 99 })}
          className="block w-full p-2 border rounded mt-3"
        />
        {errors.password && <span className="text-red-500">Required</span>}

        <input
          type="submit"
          className="block w-full p-2 mt-3 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
        />
      </form>

      {/* Status */}
      <div className="mt-[1rem]">{status}</div>
    </>
  );
};

export default Basic;
