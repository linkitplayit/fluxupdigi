'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Trophy, 
  Handshake, 
  MessageSquareQuote, 
  Settings,
  Users,
  Package,
  LogOut
} from 'lucide-react';
import { Logo } from './Logo';
import { useAuth } from '@/src/hooks/useAuth';
import { useAuthStore } from '@/src/lib/store/authStore';
import { cn } from '@/src/lib/utils/helpers';

export const Sidebar = () => {
  const pathname = usePathname();
  const { logout } = useAuthStore();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin', testId: 'admin-nav-dashboard' },
    { icon: ShoppingBag, label: 'Digital Store', href: '/admin/products', testId: 'admin-nav-products' },
    { icon: Trophy, label: 'Earn ₹500+', href: '/admin/games', testId: 'admin-nav-games' },
    { icon: Package, label: 'Orders', href: '/admin/orders', testId: 'admin-nav-orders' },
    { icon: Users, label: 'Users', href: '/admin/users', testId: 'admin-nav-users' },
    { icon: Handshake, label: 'Collaboration', href: '/admin/collaboration', testId: 'admin-nav-collaboration' },
    { icon: MessageSquareQuote, label: 'Testimonials', href: '/admin/testimonials', testId: 'admin-nav-testimonials' },
    { icon: Settings, label: 'Settings', href: '/admin/settings', testId: 'admin-nav-settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-dark-light border-r border-white/10 flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Logo variant="admin" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              data-testid={item.testId}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-white border border-primary/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              )}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={logout}
          data-testid="admin-logout-btn"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};