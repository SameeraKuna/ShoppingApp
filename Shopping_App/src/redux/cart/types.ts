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
}

export interface CartState {
  items: CartItem[];
}

export interface AddItemAction {
  type: 'cart/ADD_ITEM';
  payload: {
    productId: string;
    name: string;
    price: number;
    color?: string;
    size?: string;
  };
}

export interface RemoveItemAction {
  type: 'cart/REMOVE_ITEM';
  payload: {
    cartItemId: string;
  };
}

export interface UpdateQuantityAction {
  type: 'cart/UPDATE_QUANTITY';
  payload: {
    cartItemId: string;
    quantity: number;
  };
}

export interface ClearCartAction {
  type: 'cart/CLEAR_CART';
}

export type CartAction = AddItemAction | RemoveItemAction | UpdateQuantityAction | ClearCartAction;
