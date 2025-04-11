'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { User, Role } from '@/types/dataModel';

interface UserContextType {
  user: User | null;
  role: Role | null;
  // Add setUser or other update functions if needed later
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock data for MVP
const MOCK_USER: User = {
  id: 'user-123',
  name: 'Sam Stardust',
  email: 'sam.stardust@example.com',
};
const MOCK_ROLE: Role = 'MEMBER';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // In a real app, this state would come from auth
  const [user] = useState<User | null>(MOCK_USER);
  const [role] = useState<Role | null>(MOCK_ROLE);

  return (
    <UserContext.Provider value={{ user, role }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
