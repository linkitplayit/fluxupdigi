'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/src/lib/supabase/client';
import { useAuthStore } from '@/src/lib/store/authStore';
import { User } from '@/src/types';

export const useAuth = () => {
  const { user, setUser, logout: storeLogout } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        if (authUser) {
          const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('id', authUser.id)
            .single();

          if (userData) {
            setUser(userData as User);
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        storeLogout();
      } else if (event === 'SIGNED_IN' && session?.user) {
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (userData) {
          setUser(userData as User);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    storeLogout();
  };

  return { user, loading, logout };
};