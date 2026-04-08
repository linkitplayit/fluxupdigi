'use client';

import { useEffect, useState } from 'react';
import { Trash2, Mail } from 'lucide-react';
import { createClient } from '@/src/lib/supabase/client';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { formatDate } from '@/src/lib/utils/helpers';
import { CollaborationRequest } from '@/src/types';

export default function AdminCollaborationPage() {
  const [requests, setRequests] = useState<CollaborationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchRequests();
    
    // Real-time subscription
    const subscription = supabase
      .channel('collaboration-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'collaboration_requests' }, (payload) => {
        console.log('Collaboration change:', payload);
        fetchRequests();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchRequests = async () => {
    try {
      const { data } = await supabase
        .from('collaboration_requests')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRequest = async (id: string) => {
    if (!confirm('Delete this collaboration request?')) return;
    try {
      await supabase
        .from('collaboration_requests')
        .delete()
        .eq('id', id);
      fetchRequests();
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  return (
    <div className="space-y-6" data-testid="admin-collaboration-page">
      <div>
        <h1 className="text-3xl font-bold text-white">Collaboration Requests</h1>
        <p className="text-gray-400 mt-1">Manage partnership inquiries in real-time</p>
      </div>

      {loading ? (
        <Card><p className="text-gray-400">Loading requests...</p></Card>
      ) : requests.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-400">No collaboration requests yet</p>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {requests.map((request) => (
            <Card key={request.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">{request.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{request.email}</p>
                  <p className="text-gray-300">{request.message}</p>
                  <p className="text-gray-500 text-sm mt-3">{formatDate(request.created_at)}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <a href={`mailto:${request.email}`}>
                    <Button variant="outline" size="sm">
                      <Mail size={16} />
                    </Button>
                  </a>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteRequest(request.id)}
                    className="text-red-400 border-red-400 hover:bg-red-500/10"
                    data-testid={`delete-request-${request.id}`}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}