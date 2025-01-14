import React from 'react';

interface PremiumHeadingProps {
  title: string;
}

export function PremiumHeading({ title }: PremiumHeadingProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-2xl font-semibold text-gray-900">
        {title}
      </h1>
      <div className="h-0.5 w-12 mx-auto mt-2 bg-blue-600" />
    </div>
  );
}
