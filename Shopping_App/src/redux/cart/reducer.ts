import { v4 as uuid } from 'uuid';
import { createReducer } from '@reduxjs/toolkit';
import { CartState } from './types';
import { addToCart, removeFromCart, updateCartQuantity, clearCart } from './actions';

const initialState: CartState = {
  items: [],
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToCart, (state, action) => {
      const { productId, name, price, color, size, image } = action.payload;

      const existingItem = state.items.find(
        (item) =>
          item.productId === productId && item.color === color && item.size === size,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const newItem = {
          id: uuid() as string,
          productId,
          name,
          price,
          quantity: 1,
          color,
          size,
          image,
        };
        state.items.push(newItem);
      }
    })
    .addCase(removeFromCart, (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.cartItemId);
    })
    .addCase(updateCartQuantity, (state, action) => {
      const { cartItemId, quantity } = action.payload;

      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== cartItemId);
      } else {
        const item = state.items.find((item) => item.id === cartItemId);
        if (item) {
          item.quantity = quantity;
        }
      }
    })
    .addCase(clearCart, (state) => {
      state.items = [];
    });
});
