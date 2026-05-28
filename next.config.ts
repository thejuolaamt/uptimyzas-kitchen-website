import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      },
      {
        protocol: "https",
        hostname: "gbwptzrgsrxkeokckslr.supabase.co",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "uptimyzas-kitchen-website.vercel.app",
          },
        ],
        destination: "https://www.uptimyzaskitchen.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;