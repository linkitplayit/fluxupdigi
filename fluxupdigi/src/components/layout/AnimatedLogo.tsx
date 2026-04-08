'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SITE_NAME } from '@/src/lib/utils/constants';

export const AnimatedLogo = ({ variant = 'default' }: { variant?: 'default' | 'admin' }) => {
  return (
    <Link href="/" className="flex items-center gap-3 group" data-testid="animated-logo">
      <motion.div
        whileHover={{ scale: 1.1, rotate: 15 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-blue-500 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-2xl font-bold text-white"
          >
            F
          </motion.span>
        </div>
      </motion.div>
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-blue-500 bg-clip-text text-transparent">
          {SITE_NAME}
        </span>
        {variant === 'admin' && (
          <span className="text-xs text-gray-400">Admin Panel</span>
        )}
      </div>
    </Link>
  );
};