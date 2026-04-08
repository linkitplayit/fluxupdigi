'use client';

import { useEffect, useState } from 'react';
import { Users, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';
import { createClient } from '@/src/lib/supabase/client';
import { Card } from '@/src/components/ui/Card';
import { Skeleton } from '@/src/components/ui/Skeleton';
import { formatCurrency } from '@/src/lib/utils/helpers';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    newOrders: 0,
    totalEarnings: 0
  });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [usersRes, ordersRes] = await Promise.all([
        supabase.from('users').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*')
      ]);

      const totalEarnings = ordersRes.data
        ?.filter(o => o.status === 'approved')
        .reduce((sum, o) => sum + (o.amount || 0), 0) || 0;

      setStats({
        totalUsers: usersRes.count || 0,
        newOrders: ordersRes.data?.filter(o => o.status === 'pending').length || 0,
        totalEarnings
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const monthlyData = [
    { month: 'Jan', earnings: 5000 },
    { month: 'Feb', earnings: 8000 },
    { month: 'Mar', earnings: 12000 },
    { month: 'Apr', earnings: 15000 },
    { month: 'May', earnings: 18000 },
    { month: 'Jun', earnings: 22000 }
  ];

  const productData = [
    { name: 'AI Tools', value: 42, color: '#8B5CF6' },
    { name: 'Courses', value: 32, color: '#EC4899' },
    { name: 'APK Store', value: 26, color: '#3B82F6' }
  ];

  const StatCard = ({ icon: Icon, label, value, loading }: any) => (
    <Card className="flex items-center gap-4" data-testid={`stat-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
        <Icon className="text-white" size={28} />
      </div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        {loading ? (
          <Skeleton className="w-20 h-8 mt-1" />
        ) : (
          <p className="text-2xl font-bold text-white">{value}</p>
        )}
      </div>
    </Card>
  );

  return (
    <div className="space-y-8" data-testid="admin-dashboard">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome to FluxUpDigi Admin Panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={Users}
          label="Total Users"
          value={stats.totalUsers}
          loading={loading}
        />
        <StatCard
          icon={ShoppingCart}
          label="New Orders"
          value={stats.newOrders}
          loading={loading}
        />
        <StatCard
          icon={DollarSign}
          label="Total Earnings"
          value={formatCurrency(stats.totalEarnings)}
          loading={loading}
        />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Earnings Graph */}
        <Card>
          <h3 className="text-xl font-bold text-white mb-4">Earnings Graph</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A1333', border: '1px solid #8B5CF6' }}
                labelStyle={{ color: '#fff' }}
              />
              <Line 
                type="monotone" 
                dataKey="earnings" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                dot={{ fill: '#EC4899', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Product Distribution */}
        <Card>
          <h3 className="text-xl font-bold text-white mb-4">Top Digital Products</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {productData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
