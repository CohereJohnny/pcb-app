import React from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
// import { Footer } from '@/components/layout/Footer';
// import { Providers } from './providers';

// Test comment for CI/CD pipeline

interface CampLayoutProps {
  children: React.ReactNode;
}

export default function CampLayout({ children }: CampLayoutProps) {
  // Test comment for CI/CD pipeline
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
