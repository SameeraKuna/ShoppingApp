import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartTotalCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotalPrice = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + item.price * item.quantity, 0)
);
