import { createAction } from '@reduxjs/toolkit';

export const addToCart = createAction(
  'cart/ADD_ITEM',
  (productId: string, name: string, price: number, color?: string, size?: string, image?: string) => ({
    payload: {
      productId,
      name,
      price,
      color,
      size,
      image,
    },
  }),
);

export const removeFromCart = createAction(
  'cart/REMOVE_ITEM',
  (cartItemId: string) => ({
    payload: { cartItemId },
  }),
);

export const updateCartQuantity = createAction(
  'cart/UPDATE_QUANTITY',
  function prepare(cartItemId: string, quantity: number) {
    return {
      payload: { cartItemId, quantity },
    };
  },
);

export const clearCart = createAction('cart/CLEAR_CART');
