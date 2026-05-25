import { put, takeLatest, call } from 'redux-saga/effects';
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} from '../products/productSlice';
import { mockFetchProducts } from '@/services/mockApi';
import { Product } from '@/data/products';

export const FETCH_PRODUCTS = 'products/FETCH_PRODUCTS';

function* fetchProductsSaga(): Generator<any, void, Product[]> {
  try {
    yield put(fetchProductsStart());
    const products: Product[] = yield call(mockFetchProducts);
    yield put(fetchProductsSuccess(products));
  } catch (error: any) {
    yield put(fetchProductsFailure(error.message || 'Failed to fetch products'));
  }
}

function* watchProductSaga() {
  yield takeLatest(FETCH_PRODUCTS, fetchProductsSaga);
}

export default watchProductSaga;
