'use client';

import { ReactNode } from 'react';
import { cn } from '@/src/lib/utils/helpers';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div className={cn('bg-dark-lighter rounded-xl p-6 border border-primary/10', className)}>
      {children}
    </div>
  );
};