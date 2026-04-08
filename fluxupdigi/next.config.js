/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['agysshkntimihbiasrlc.supabase.co'],
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig