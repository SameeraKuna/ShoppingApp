export const ADD_ITEM = 'cart/ADD_ITEM' as const;
export const REMOVE_ITEM = 'cart/REMOVE_ITEM' as const;
export const UPDATE_QUANTITY = 'cart/UPDATE_QUANTITY' as const;
export const CLEAR_CART = 'cart/CLEAR_CART' as const;

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
  image?: string;
}

export interface CartState {
  items: CartItem[];
}
