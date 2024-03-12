export const increaseCount = (data) => {
  return {
    type: "INCREMENT",
    payload: data,
  };
};

export const decreaseCount = (data) => {
  return {
    type: "DECREMENT",
    payload: data,
  };
};

export const printSomething = async () => {
  return async (dispatch) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = await res.json();
    dispatch({
      type: "PRINT_SOMETHING",
      payload: data,
    });

    // Handle any errors
  };
};
