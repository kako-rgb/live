/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@mui/material'],
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig