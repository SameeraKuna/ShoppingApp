import { all } from 'redux-saga/effects';
import watchProductSaga from './productSaga';

function* rootSaga() {
  yield all([watchProductSaga()]);
}

export default rootSaga;
