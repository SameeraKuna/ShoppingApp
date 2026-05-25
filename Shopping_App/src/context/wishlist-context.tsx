import React, { createContext, useState, ReactNode } from 'react';

interface WishlistContextType {
  items: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
  clear: () => void;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<string[]>([]);

  const toggle = (productId: string) => {
    setItems((prevItems) =>
      prevItems.includes(productId)
        ? prevItems.filter((id) => id !== productId)
        : [...prevItems, productId]
    );
  };

  const has = (productId: string) => {
    return items.includes(productId);
  };

  const clear = () => {
    setItems([]);
  };

  return (
    <WishlistContext.Provider value={{ items, toggle, has, clear }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = React.useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};
