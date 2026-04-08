'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, ExternalLink, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { createClient } from '@/src/lib/supabase/client';
import { Game } from '@/src/types';
import { formatCurrency } from '@/src/lib/utils/helpers';
import { Skeleton } from '../ui/Skeleton';

export const EarnSection = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const { data } = await supabase
        .from('games')
        .select('*')
        .eq('verified', true)
        .limit(3)
        .order('created_at', { ascending: false });

      if (data) setGames(data);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8" data-testid="earn-section">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Trophy className="text-secondary" size={32} />
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Earn ₹500+ Daily</h2>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Play premium games and earn real money through referrals
            </p>
          </motion.div>
        </div>

        {/* Games Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <GlassCard key={i}>
                  <Skeleton className="w-full h-48 mb-4" />
                  <Skeleton className="w-3/4 h-6 mb-2" />
                  <Skeleton className="w-full h-4 mb-4" />
                  <Skeleton className="w-full h-10" />
                </GlassCard>
              ))
            : games.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard hover className="h-full flex flex-col">
                    <div className="w-full h-48 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-xl mb-4 flex items-center justify-center">
                      <Trophy size={64} className="text-secondary" />
                    </div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-white text-lg">{game.title}</h3>
                      {game.verified && (
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mb-1">{game.category}</p>
                    <p className="text-gray-400 text-sm mb-4 flex-1">
                      {game.description?.substring(0, 80)}...
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Entry Fee:</span>
                        <span className="text-xl font-bold text-secondary">
                          {formatCurrency(game.price)}
                        </span>
                      </div>
                      <a
                        href={game.referral_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="w-full" size="sm" data-testid={`game-play-${game.id}`}>
                          Play Now
                          <ExternalLink size={16} className="ml-2" />
                        </Button>
                      </a>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
        </div>

        {/* View All */}
        <div className="text-center">
          <Link href="/games">
            <Button variant="outline" data-testid="view-all-games-btn">
              View All Games
              <ExternalLink size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};