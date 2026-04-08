'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/Button';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20" data-testid="hero-section">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm text-primary font-medium">Your Premium Digital Hub</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-white via-primary to-secondary bg-clip-text text-transparent">
              Upgrade Your
            </span>
            <br />
            <span className="text-white">Digital Experience</span>
          </h1>

          <p className="text-lg text-gray-300 max-w-xl">
            Unlock Premium Tools & Earn Money from Games. Access exclusive AI tools, courses, and earning opportunities all in one place.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/products">
              <Button size="lg" data-testid="hero-explore-store-btn">
                Explore Store
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
            <Link href="/games">
              <Button variant="outline" size="lg" data-testid="hero-earn-now-btn">
                Earn Now
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8">
            <div>
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-sm text-gray-400">Happy Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">₹500+</div>
              <div className="text-sm text-gray-400">Daily Earning</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-sm text-gray-400">Premium Tools</div>
            </div>
          </div>
        </motion.div>

        {/* Right side - Earth renders here */}
        <div className="hidden lg:block" />
      </div>
    </section>
  );
};