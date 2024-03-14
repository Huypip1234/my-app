export const increaseCount = (data) => {
  return {
    type: 'INCREMENT',
    payload: data,
  };
};

export const decreaseCount = (data) => {
  return {
    type: 'DECREMENT',
    payload: data,
  };
};

export const printSomething = () => {
  // Nếu chỉ return 2 lần obj thì phải gọi function()() -> lại trở thành action thường
  // -> phải dùng dispatch phát nữa kết hợp THUNK
  // thunk tự nhận ra funtion -> tự gọi dispatch phát nữa
  // thunk giúp action có thể trả về function thay vì object như bình thường
  return async (dispatch) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await res.json();
    dispatch({
      type: 'PRINT_SOMETHING',
      payload: data,
    });
  };
  // why phải viết func vào action ntn?
  // vì để xử lí logic trong action cho gọn mà ko dính đến component
};
