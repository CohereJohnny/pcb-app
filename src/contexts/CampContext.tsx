'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Camp } from '@/types/dataModel';

interface CampContextType {
  camp: Camp | null;
  // Add setCamp or other update functions if needed later
}

const CampContext = createContext<CampContextType | undefined>(undefined);

// Mock data for MVP
const MOCK_CAMP: Camp = {
  id: 'mock-camp-123',
  name: 'The Shifting Sands Saloon',
};

export const CampProvider = ({ children }: { children: ReactNode }) => {
  // In a real app, this might be determined by URL or user selection
  const [camp] = useState<Camp | null>(MOCK_CAMP);

  return (
    <CampContext.Provider value={{ camp }}>{children}</CampContext.Provider>
  );
};

export const useCamp = () => {
  const context = useContext(CampContext);
  if (context === undefined) {
    throw new Error('useCamp must be used within a CampProvider');
  }
  return context;
};
