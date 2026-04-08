'use client';

import { Navbar } from '@/src/components/layout/Navbar';
import { Footer } from '@/src/components/layout/Footer';
import { DigitalStore } from '@/src/components/home/DigitalStore';

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24">
        <DigitalStore />
      </div>
      <Footer />
    </>
  );
}
