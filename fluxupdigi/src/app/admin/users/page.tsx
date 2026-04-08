'use client';

import { useEffect, useState } from 'react';
import { Ban, UserCheck, Shield, Mail } from 'lucide-react';
import { createClient } from '@/src/lib/supabase/client';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { formatDate } from '@/src/lib/utils/helpers';
import { User } from '@/src/types';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchUsers();
    
    // Real-time subscription
    const subscription = supabase
      .channel('users-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, (payload) => {
        console.log('User change:', payload);
        fetchUsers();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    try {
      await supabase
        .from('users')
        .update({ role: newRole })
        .eq('id', userId);
      fetchUsers();
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const sendMagicLink = async (email: string) => {
    try {
      await supabase.auth.signInWithOtp({ email });
      alert(`Magic link sent to ${email}`);
    } catch (error) {
      console.error('Error sending magic link:', error);
    }
  };

  return (
    <div className="space-y-6" data-testid="admin-users-page">
      <div>
        <h1 className="text-3xl font-bold text-white">Users Management</h1>
        <p className="text-gray-400 mt-1">Manage all users and their permissions</p>
      </div>

      {loading ? (
        <Card><p className="text-gray-400">Loading users...</p></Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Role</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Joined</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-4 text-white">{user.name || 'N/A'}</td>
                    <td className="py-3 px-4 text-gray-300">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        user.role === 'admin' 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-gray-700 text-gray-300'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-sm">
                      {formatDate(user.created_at)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleUserRole(user.id, user.role)}
                          data-testid={`toggle-role-${user.id}`}
                        >
                          <Shield size={14} className="mr-1" />
                          {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => sendMagicLink(user.email)}
                          data-testid={`send-link-${user.id}`}
                        >
                          <Mail size={14} className="mr-1" />
                          Send Link
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}