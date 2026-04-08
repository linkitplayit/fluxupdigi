# FluxUpDigi - Premium Digital Platform

A futuristic platform with 3D Earth background, glassmorphism design, digital store, and earning opportunities.

## Features

- 🌍 3D Rotating Earth with React Three Fiber
- 💎 Glassmorphism UI Design (Purple/Pink Gradients)
- 🛍️ Digital Store (AI Tools, Courses, APK Files)
- 💰 Earn ₹500+ Daily Section (Referral Games)
- 👨‍💼 Complete Admin Panel
- 🔐 Multiple Auth Methods (Google, Email+OTP, Email+Password)
- 💳 Razorpay + Manual Payment

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **3D**: React Three Fiber + Drei
- **Backend**: Supabase (Auth, Database, Storage)
- **Payment**: Razorpay
- **State**: Zustand
- **Charts**: Recharts

## Setup Instructions

### 1. Install Dependencies

```bash
yarn install
```

### 2. Environment Variables

The `.env.local` file already contains Supabase credentials. Update these:

```env
NEXT_PUBLIC_SUPABASE_URL=https://agysshkntimihbiasrlc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_key>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY
RAZORPAY_KEY_SECRET=your_secret
```

### 3. Supabase Setup

Run this SQL in Supabase SQL Editor:

```sql
-- Add missing columns
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='settings' AND column_name='payment_mode') THEN
        ALTER TABLE public.settings ADD COLUMN payment_mode TEXT DEFAULT 'manual';
    END IF;
END $$;

-- Create collaboration table
CREATE TABLE IF NOT EXISTS public.collaboration_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. Run Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
fluxupdigi/
├── src/
│   ├── app/              # Next.js pages
│   ├── components/       # React components
│   ├── lib/              # Utilities, stores, Supabase
│   ├── hooks/            # Custom hooks
│   └── types/            # TypeScript types
├── public/               # Static assets
└── package.json
```

## Admin Panel

Access admin panel at `/admin` (requires admin role in Supabase users table).

**Features:**
- Dashboard with stats & charts
- Product management
- Game management
- Order approval (manual payments)
- User management
- Settings (payment mode, Razorpay keys)

## Authentication

Three methods supported:
1. **Google OAuth** - Configure in Supabase Dashboard
2. **Email + OTP** - Magic link
3. **Email + Password** - Traditional signup/login

## Payment System

**Automatic (Razorpay)**:
- Admin enters Razorpay keys in settings
- Checkout modal opens automatically
- Order approved on successful payment

**Manual**:
- User sees UPI ID, uploads screenshot + UTR
- Admin approves from orders page
- Purchase unlocked after approval

## Deployment

### Netlify

```bash
yarn build
```

Push to GitHub and connect to Netlify. Environment variables will auto-deploy.

### Manual

The `netlify.toml` is already configured. Just connect your repo.

## Support

Telegram: [@errorzxl](https://t.me/errorzxl)

---

© 2025 FluxUpDigi | Founder: **Rᴀᴊᴀ Jɪ**
