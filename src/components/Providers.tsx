'use client';

import React from 'react';
import { UserProvider } from '@/contexts/UserContext';
import { CampProvider } from '@/contexts/CampContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <UserProvider>
      <CampProvider>{children}</CampProvider>
    </UserProvider>
  );
}
