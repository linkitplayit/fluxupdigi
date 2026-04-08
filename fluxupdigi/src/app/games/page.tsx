'use client';

import { Navbar } from '@/src/components/layout/Navbar';
import { Footer } from '@/src/components/layout/Footer';
import { EarnSection } from '@/src/components/home/EarnSection';

export default function GamesPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24">
        <EarnSection />
      </div>
      <Footer />
    </>
  );
}
