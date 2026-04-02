import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "dfbowysefibjlbmmizlq.supabase.co",
      "dummyimage.com",
      "randomuser.me"
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' data: https:; connect-src 'self' https:; frame-src 'self' https://www.youtube.com https://www.google.com https://www.bible.com https://*.bible.com;"
          }
        ]
      }
    ]
  }
};

export default nextConfig;
