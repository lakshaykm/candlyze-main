import React from 'react';
import { Check, X } from 'lucide-react';

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

interface PasswordRequirementsProps {
  password: string;
}

const requirements: PasswordRequirement[] = [
  {
    label: '8-16 characters long',
    test: (password) => password.length >= 8 && password.length <= 16,
  },
  {
    label: 'Contains uppercase letter',
    test: (password) => /[A-Z]/.test(password),
  },
  {
    label: 'Contains lowercase letter',
    test: (password) => /[a-z]/.test(password),
  },
  {
    label: 'Contains number',
    test: (password) => /[0-9]/.test(password),
  },
  {
    label: 'Contains special character',
    test: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
];

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  return (
    <div className="mt-2 space-y-2 text-sm">
      <p className="font-medium text-gray-700">Password must have:</p>
      <ul className="space-y-1">
        {requirements.map((req, index) => {
          const isMet = req.test(password);
          return (
            <li 
              key={index}
              className={`flex items-center gap-2 ${
                isMet ? 'text-green-600' : 'text-gray-500'
              }`}
            >
              {isMet ? (
                <Check className="w-4 h-4" />
              ) : (
                <X className="w-4 h-4" />
              )}
              {req.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
