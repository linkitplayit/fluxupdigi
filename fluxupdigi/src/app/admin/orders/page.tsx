'use client';

import { useEffect, useState } from 'react';
import { Check, X, ExternalLink } from 'lucide-react';
import { createClient } from '@/src/lib/supabase/client';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { formatDate, formatCurrency } from '@/src/lib/utils/helpers';
import { Order } from '@/src/types';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchOrders();
    
    const subscription = supabase
      .channel('orders-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        fetchOrders();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await supabase
        .from('orders')
        .select(`
          *,
          user:users(*),
          product:products(*),
          game:games(*)
        `)
        .order('created_at', { ascending: false });
      if (data) setOrders(data as any);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const approveOrder = async (order: Order) => {
    if (!confirm('Approve this order?')) return;
    
    setProcessing(order.id);
    try {
      await supabase
        .from('orders')
        .update({ status: 'approved' })
        .eq('id', order.id);

      await supabase.from('user_purchases').insert([{
        user_id: order.user_id,
        product_id: order.product_id,
        game_id: order.game_id,
        order_id: order.id
      }]);

      alert('Order approved!');
      fetchOrders();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setProcessing(null);
    }
  };

  const rejectOrder = async (orderId: string) => {
    if (!confirm('Reject this order?')) return;
    
    setProcessing(orderId);
    try {
      await supabase
        .from('orders')
        .update({ status: 'rejected' })
        .eq('id', orderId);
      fetchOrders();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Orders Management</h1>
        <p className="text-gray-400 mt-1">Approve or reject orders</p>
      </div>

      {loading ? (
        <Card><p className="text-gray-400">Loading...</p></Card>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <Card key={order.id} className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {order.product?.title || order.game?.title}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-400">
                      Customer: {order.user?.email}
                    </p>
                    <p className="text-gray-400">
                      Amount: {formatCurrency(order.amount)}
                    </p>
                    <p className="text-gray-400">
                      Date: {formatDate(order.created_at)}
                    </p>
                    <p>
                      <span className={`px-2 py-1 rounded text-xs ${
                        order.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                        order.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {order.status}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  {order.payment_screenshot && (
                    <div className="mb-4">
                      <a
                        href={order.payment_screenshot}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-40 bg-dark-lighter rounded-lg overflow-hidden border border-primary/20"
                      >
                        <img
                          src={order.payment_screenshot}
                          alt="Payment"
                          className="w-full h-full object-cover"
                        />
                      </a>
                    </div>
                  )}

                  {order.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => approveOrder(order)}
                        className="flex-1 bg-green-600"
                        disabled={processing === order.id}
                      >
                        <Check size={16} className="mr-2" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => rejectOrder(order.id)}
                        variant="outline"
                        className="flex-1 text-red-400"
                        disabled={processing === order.id}
                      >
                        <X size={16} className="mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
