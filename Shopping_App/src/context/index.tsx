import React, { ReactNode } from 'react';
import { AuthProvider } from './auth-context';
import { WishlistProvider } from './wishlist-context';
import { UserProvider } from './UserContext';

export { useAuth } from './auth-context';
export { useWishlist } from './wishlist-context';
export { useUserContext } from './UserContext';

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <WishlistProvider>
        <UserProvider>{children}</UserProvider>
      </WishlistProvider>
    </AuthProvider>
  );
};
