// sagas.js
import { call, put, takeEvery } from "redux-saga/effects";

// javascript generator function
function* fetchPostsSaga() {
  try {
    const response = yield call(
      fetch,
      "https://jsonplaceholder.typicode.com/posts"
    );
    const data = yield response.json();
    yield put({ type: "posts/fetchPostsSuccess", payload: data });
  } catch (error) {
    yield put({ type: "posts/fetchPostsFailure", payload: error.message });
  }
}

export function* rootSaga() {
  yield takeEvery("posts/fetchPostsRequest", fetchPostsSaga);
}
