import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

export function Link({ href, children }: LinkProps) {
  return (
    <RouterLink 
      to={href} 
      className="text-sm hover:text-white transition-colors"
    >
      {children}
    </RouterLink>
  );
}