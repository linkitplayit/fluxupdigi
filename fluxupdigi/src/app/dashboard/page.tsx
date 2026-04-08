'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/hooks/useAuth';
import { Navbar } from '@/src/components/layout/Navbar';
import { Footer } from '@/src/components/layout/Footer';
import { Card } from '@/src/components/ui/Card';
import { Package, Download, DollarSign } from 'lucide-react';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-12" data-testid="user-dashboard">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">My Dashboard</h1>
          
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <Card className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Package className="text-primary" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Orders</p>
                <p className="text-2xl font-bold text-white">0</p>
              </div>
            </Card>
            <Card className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                <Download className="text-secondary" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Downloads</p>
                <p className="text-2xl font-bold text-white">0</p>
              </div>
            </Card>
            <Card className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <DollarSign className="text-primary" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Spent</p>
                <p className="text-2xl font-bold text-white">₹0</p>
              </div>
            </Card>
          </div>

          <Card>
            <h2 className="text-xl font-bold text-white mb-4">Recent Orders</h2>
            <p className="text-gray-400 text-center py-8">No orders yet. Start shopping!</p>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
