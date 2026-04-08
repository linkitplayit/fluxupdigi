# 🚀 FluxUpDigi Netlify Deployment Guide

## Method 1: Deploy via Emergent Interface (Recommended)

If you see a **"Deploy"** button in your Emergent interface:

1. Click the **Deploy** button
2. Select **Netlify** as the platform
3. Connect your Netlify account (if not already connected)
4. Choose deployment settings:
   - Site name: `fluxupdigi` (or your preferred name)
   - Build command: `yarn build`
   - Publish directory: `.next`
5. Add environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://agysshkntimihbiasrlc.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   NEXT_PUBLIC_SITE_URL=https://fluxupdigi.netlify.app
   ```
6. Click **Deploy**

Your site will be live at: `https://fluxupdigi.netlify.app` (or your custom name)

---

## Method 2: Manual Deployment via Netlify CLI

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify
```bash
netlify login
```

### Step 3: Initialize Deployment
```bash
cd /app/fluxupdigi
netlify init
```

Choose:
- Create & configure a new site
- Site name: fluxupdigi
- Build command: `yarn build`
- Publish directory: `.next`

### Step 4: Set Environment Variables
```bash
netlify env:set NEXT_PUBLIC_SUPABASE_URL "https://agysshkntimihbiasrlc.supabase.co"
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "your-anon-key"
netlify env:set NEXT_PUBLIC_SITE_URL "https://fluxupdigi.netlify.app"
```

### Step 5: Deploy
```bash
netlify deploy --prod
```

---

## Method 3: Deploy via GitHub + Netlify

### Step 1: Push to GitHub
1. Create a new repository on GitHub: `fluxupdigi`
2. Push your code:
   ```bash
   cd /app/fluxupdigi
   git init
   git add .
   git commit -m "Initial commit - FluxUpDigi platform"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/fluxupdigi.git
   git push -u origin main
   ```

### Step 2: Connect to Netlify
1. Go to [Netlify](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub**
4. Select your `fluxupdigi` repository
5. Configure build settings:
   - Build command: `yarn build`
   - Publish directory: `.next`
   - Framework: Next.js

### Step 3: Add Environment Variables
In Netlify dashboard:
- Go to **Site settings** → **Environment variables**
- Add:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_SITE_URL`

### Step 4: Deploy
Click **"Deploy site"**

---

## 📝 Post-Deployment Checklist

After deployment, your site will be at:
**https://fluxupdigi.netlify.app** (or your custom domain)

### 1. Update Supabase Redirect URLs
In Supabase Dashboard → Authentication → URL Configuration:
- Add: `https://fluxupdigi.netlify.app/auth/callback`
- Add: `https://fluxupdigi.netlify.app`

### 2. Test Authentication
- Visit your site
- Click "Get Started"
- Try all 3 login methods:
  - Google OAuth
  - Email + OTP
  - Email + Password

### 3. Create Admin Account
After signing up:
1. Go to Supabase SQL Editor
2. Run:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
   ```
3. Logout and login again
4. Access `/admin` panel

### 4. Add Sample Data
Run the sample data SQL from above to populate products and games

### 5. Test Complete Flow
- ✅ Browse products on homepage
- ✅ View games in Earn section
- ✅ Login to admin panel
- ✅ Add a product from admin
- ✅ Toggle maintenance mode
- ✅ Test logout

---

## 🔧 Troubleshooting

**Build fails?**
- Check Node version: Should be 18+ (Netlify uses Node 18 by default)
- Ensure all dependencies are in package.json

**Authentication not working?**
- Verify Supabase redirect URLs include your Netlify domain
- Check environment variables are set correctly

**Images not loading?**
- Ensure Supabase storage buckets are public
- Check image URLs in database

---

## 🎉 Final URL

After successful deployment, your FluxUpDigi will be live at:

**https://fluxupdigi.netlify.app**

(Or your custom domain if configured)

You can also add a custom domain in Netlify:
- Go to **Domain settings**
- Add custom domain: `fluxupdigi.com`
- Update DNS records as instructed

---

Need help? Contact via Telegram: @errorzxl
