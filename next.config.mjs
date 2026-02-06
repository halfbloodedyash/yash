/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-83c5db439b40468498f97946200806f7.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'cdn.magicui.design',
      },
      {
        protocol: 'https',
        hostname: 'cdn.llm.report',
      },
    ],
  },
};

export default nextConfig;
