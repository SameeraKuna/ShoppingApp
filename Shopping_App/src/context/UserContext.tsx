import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/services/userService';

interface UserContextType {
  newlyCreatedUser: User | null;
  setNewlyCreatedUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [newlyCreatedUser, setNewlyCreatedUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ newlyCreatedUser, setNewlyCreatedUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within UserProvider');
  }
  return context;
}
