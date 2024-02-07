/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APPWRITE_PROJECT: process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
    DATABSE_URL: process.env.DATABSE_URL,
    APPWRITE_URL: process.env.APPWRITE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;