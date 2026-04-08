'use client';

import { Navbar } from '@/src/components/layout/Navbar';
import { Footer } from '@/src/components/layout/Footer';
import { Hero } from '@/src/components/home/Hero';
import { DigitalStore } from '@/src/components/home/DigitalStore';
import { EarnSection } from '@/src/components/home/EarnSection';
import { Collaboration } from '@/src/components/home/Collaboration';

export default function HomePage() {
  return (
    <>
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-light to-dark animate-gradient bg-[length:400%_400%]" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <DigitalStore />
          <EarnSection />
          <Collaboration />
        </main>
        <Footer />
      </div>
    </>
  );
}