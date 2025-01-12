import React from 'react';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { AppHeader } from './AppHeader';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <AppHeader />
        <main className="flex-1 p-8">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
