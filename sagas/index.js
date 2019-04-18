import { takeLatest, call, put } from 'redux-saga/effects';

// use them in parallel
export default function* mainSagas() {
  yield takeLatest(sagasFetchType, FetchDataSagas);
}

export const sagasFetchType = 'API_REQUIRE'; // send data to server - get answer and put it in store

export const FetchSaga = ({
  reducerAction,
  url
}) => ({
  type: sagasFetchType,
  url,
  reducerAction
}
);

export function* FetchDataSagas({
  url, reducerAction
}) {
  const data = yield call(fetchApiData, url);
  yield put(reducerAction({ response: data }));
}

export const fetchApiData = url => fetch(url).then(data => data.json());
