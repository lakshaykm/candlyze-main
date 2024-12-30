import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{title}</h1>
        {children}
      </main>
      <Footer />
    </div>
  );
}