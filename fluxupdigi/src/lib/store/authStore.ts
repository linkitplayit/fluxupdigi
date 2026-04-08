import { create } from 'zustand';
import { User } from '@/src/types';
import { createClient } from '@/src/lib/supabase/client';

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAdmin: false,
  setUser: (user) => set({ user, isAdmin: user?.role === 'admin' }),
  logout: async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    set({ user: null, isAdmin: false });
    
    // Clear all local storage
    if (typeof window !== 'undefined') {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/login';
    }
  }
}));