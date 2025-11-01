/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { turbo: true },
  turbopack: { root: __dirname }, // force root to current folder
};

module.exports = nextConfig;
