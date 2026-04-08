'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ExternalLink, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { createClient } from '@/src/lib/supabase/client';
import { Product } from '@/src/types';
import { formatCurrency } from '@/src/lib/utils/helpers';
import { Skeleton } from '../ui/Skeleton';

export const DigitalStore = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('verified', true)
        .limit(4)
        .order('created_at', { ascending: false });

      if (data) setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8" data-testid="digital-store-section">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <ShoppingBag className="text-primary" size={32} />
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Digital Store</h2>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Premium AI tools, courses, and applications to boost your productivity
            </p>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <GlassCard key={i}>
                  <Skeleton className="w-full h-40 mb-4" />
                  <Skeleton className="w-3/4 h-6 mb-2" />
                  <Skeleton className="w-full h-4 mb-4" />
                  <Skeleton className="w-1/2 h-10" />
                </GlassCard>
              ))
            : products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard hover className="h-full flex flex-col">
                    <div className="w-full h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-4 flex items-center justify-center">
                      <ShoppingBag size={48} className="text-primary" />
                    </div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-white text-lg">{product.title}</h3>
                      {product.verified && (
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-4 flex-1">
                      {product.description?.substring(0, 60)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        {formatCurrency(product.price)}
                      </span>
                      <Link href={`/products/${product.id}`}>
                        <Button size="sm" data-testid={`product-buy-${product.id}`}>
                          Buy Now
                        </Button>
                      </Link>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
        </div>

        {/* View All */}
        <div className="text-center">
          <Link href="/products">
            <Button variant="outline" data-testid="view-all-products-btn">
              View All
              <ExternalLink size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};