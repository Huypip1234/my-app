import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import store from './store';
import { fetchPostsRequest } from './slice';

// Giống Thunk nhưng Pro hơn (test, effect (take, put, call,...), chống spam api (generate func), loading, error, ...)

/* ake: Lắng nghe một action cụ thể.
put: Gửi một action.
call: Gọi một hàm bất đồng bộ.
fork: Chạy một Saga mới.
select: Lấy dữ liệu từ store.
race: Chờ đợi kết quả của một trong nhiều tác vụ bất đồng bộ.
takeEvery: Lắng nghe tất cả các action của một loại cụ thể.
takeLatest: Lắng nghe action mới nhất của một loại cụ thể. */
const SubReduxSaga = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state); // saga có thêm loading và error

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className='form-container my-[1rem] flex flex-col items-center gap-[1rem]'>
      <h1 className='text-[#86d46b] text-[36px] font-[500]'>Redux Saga</h1>
      {/* <h4 className="text-[#86d46b]">{counter}</h4> */}
      <div className='flex items-center gap-[1rem]'>
        {/* <Button
          className="!bg-[#ebedf0] !text-[#86d46b]"
          onClick={() => {
            dispatch(increaseCount(1));
          }}
        >
          Increase
        </Button>
        <Button
          className="!bg-[#ebedf0] !text-[#86d46b]"
          onClick={() => {
            dispatch(decreaseCount(1));
          }}
        >
          Decrease
        </Button> */}
        <Button
          className='!bg-[#ebedf0] !text-[#86d46b]'
          onClick={() => {
            dispatch(fetchPostsRequest());
          }}
        >
          Print something!
        </Button>
      </div>
      {/* <h4 className="text-[#86d46b]">{something}</h4> */}
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

const ReduxSaga = () => {
  return (
    <Provider store={store}>
      <SubReduxSaga />
    </Provider>
  );
};

export default ReduxSaga;
