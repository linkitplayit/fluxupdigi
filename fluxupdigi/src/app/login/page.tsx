'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { GlassCard } from '@/src/components/ui/GlassCard';
import { createClient } from '@/src/lib/supabase/client';
import { Logo } from '@/src/components/layout/Logo';
import Image from 'next/image';

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup' | 'otp'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleEmailPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              role: 'user'
            }
          }
        });
        
        if (error) throw error;
        setMessage('Check your email for verification link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) throw error;
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) throw error;
      setMessage('Check your email for the magic link!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" data-testid="login-page">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur-2xl opacity-30" />
              <Image
                src="/images/logo.png"
                alt="FluxUpDigi Logo"
                width={220}
                height={78}
                priority
                className="relative z-10 h-16 md:h-20 w-auto object-contain"
                style={{ 
                  mixBlendMode: 'screen',
                  filter: 'brightness(1.1) contrast(1.1)'
                }}
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mt-6 mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to access your account</p>
        </div>

        <GlassCard>
          {/* Auth Mode Tabs */}
          <div className="flex gap-2 mb-6 p-1 bg-dark-lighter rounded-xl">
            <button
              onClick={() => setMode('login')}
              data-testid="tab-login"
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode('signup')}
              data-testid="tab-signup"
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                mode === 'signup'
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setMode('otp')}
              data-testid="tab-otp"
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                mode === 'otp'
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              OTP
            </button>
          </div>

          {/* Google OAuth */}
          <Button
            onClick={handleGoogleAuth}
            variant="outline"
            className="w-full mb-4"
            data-testid="google-auth-btn"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-dark-lighter text-gray-400">Or continue with</span>
            </div>
          </div>

          {/* Email/Password or OTP Form */}
          {mode === 'otp' ? (
            <form onSubmit={handleOTP} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="otp-email-input"
              />
              <Button type="submit" className="w-full" disabled={loading} data-testid="send-otp-btn">
                {loading ? 'Sending...' : 'Send Magic Link'}
                <Mail size={16} className="ml-2" />
              </Button>
            </form>
          ) : (
            <form onSubmit={handleEmailPassword} className="space-y-4">
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="email-input"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                data-testid="password-input"
              />
              <Button type="submit" className="w-full" disabled={loading} data-testid="submit-btn">
                {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </form>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm" data-testid="error-message">
              {error}
            </div>
          )}

          {message && (
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm" data-testid="success-message">
              {message}
            </div>
          )}
        </GlassCard>

        <p className="text-center text-gray-400 text-sm mt-6">
          By continuing, you agree to our{' '}
          <Link href="/legal/terms" className="text-primary hover:underline">
            Terms & Conditions
          </Link>
        </p>
      </div>
    </div>
  );
}