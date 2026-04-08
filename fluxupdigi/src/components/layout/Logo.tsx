'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface LogoProps {
  variant?: 'default' | 'admin' | 'large';
  showTagline?: boolean;
}

export const Logo = ({ variant = 'default', showTagline = false }: LogoProps) => {
  const sizeClasses = {
    default: 'h-8 md:h-10',
    admin: 'h-10 md:h-12',
    large: 'h-16 md:h-20'
  };

  return (
    <Link href="/" className="flex items-center gap-3 group" data-testid="logo-link">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative flex items-center"
      >
        {/* Glow effect */}
        <motion.div
          animate={{
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -inset-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur-xl opacity-40 group-hover:opacity-60 transition-opacity"
        />
        
        {/* Logo image with transparent background */}
        <div className="relative logo-container">
          <Image
            src="/images/logo.png"
            alt="FluxUpDigi - Level Up Your Digital Income"
            width={160}
            height={57}
            priority
            className={`${sizeClasses[variant]} w-auto object-contain relative z-10 logo-image`}
            style={{ 
              mixBlendMode: 'screen',
              filter: 'brightness(1.1) contrast(1.1)'
            }}
          />
        </div>
      </motion.div>
      
      {variant === 'admin' && (
        <span className="text-xs text-gray-400 ml-2">Admin Panel</span>
      )}
      
      {showTagline && (
        <p className="text-sm text-gray-400 mt-2">Level Up Your Digital Income</p>
      )}
    </Link>
  );
};
