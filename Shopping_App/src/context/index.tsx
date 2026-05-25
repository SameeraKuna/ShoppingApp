import React, { ReactNode } from 'react';
import { AuthProvider } from './auth-context';
import { WishlistProvider } from './wishlist-context';

export { useAuth } from './auth-context';
export { useWishlist } from './wishlist-context';

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <WishlistProvider>{children}</WishlistProvider>
    </AuthProvider>
  );
};
