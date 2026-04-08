'use client';

import { motion } from 'framer-motion';
import { Handshake, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';

export const Collaboration = () => {
  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8" data-testid="collaboration-section">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-6">
              <Handshake size={40} className="text-white" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Partner With Us
            </h2>
            
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Boost your business with FluxUpDigi. Effortlessly partner with us and reach your target audience.
              Join our growing network of successful collaborators.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-white/5 rounded-xl border border-primary/10">
                <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                <div className="text-sm text-gray-400">Active Partners</div>
              </div>
              <div className="p-6 bg-white/5 rounded-xl border border-primary/10">
                <div className="text-3xl font-bold text-secondary mb-2">50K+</div>
                <div className="text-sm text-gray-400">Audience Reach</div>
              </div>
              <div className="p-6 bg-white/5 rounded-xl border border-primary/10">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-gray-400">Support</div>
              </div>
            </div>

            <Link href="/collaboration">
              <Button size="lg" data-testid="collaborate-now-btn">
                Collaborate Now
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};