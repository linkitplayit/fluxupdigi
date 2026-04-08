'use client';

import { ReactNode } from 'react';
import { cn } from '@/src/lib/utils/helpers';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard = ({ children, className, hover = false }: GlassCardProps) => {
  return (
    <div
      className={cn(
        'backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6',
        'shadow-xl shadow-primary/5',
        hover && 'hover:bg-white/10 hover:border-primary/30 hover:shadow-primary/20 transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  );
};