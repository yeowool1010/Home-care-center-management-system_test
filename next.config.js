/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // App Router 사용 여부 확인
  },
};

module.exports = nextConfig;
