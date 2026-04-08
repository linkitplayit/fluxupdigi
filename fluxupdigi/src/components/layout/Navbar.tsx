'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '../ui/Button';
import { useAuth } from '@/src/hooks/useAuth';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Digital Store' },
    { href: '/games', label: 'Earn ₹500+' },
    { href: '/collaboration', label: 'Collaboration' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-dark/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-primary'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link href={user.role === 'admin' ? '/admin' : '/dashboard'}>
                  <Button variant="ghost" size="sm" data-testid="nav-dashboard-btn">
                    <User size={16} className="mr-2" />
                    {user.role === 'admin' ? 'Admin' : 'Dashboard'}
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={logout} data-testid="nav-logout-btn">
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button size="sm" data-testid="nav-login-btn">Get Started</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark-light border-t border-white/10" data-testid="mobile-menu">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-300 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  href={user.role === 'admin' ? '/admin' : '/dashboard'}
                  className="block py-2 text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-red-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full" size="sm">Get Started</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};