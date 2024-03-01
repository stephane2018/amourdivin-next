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
      {
        protocol: "https",
        hostname: "www.mboasms.cm",
      },
      {
        protocol: "http",
        hostname: "192.168.1.183",
      },
    ],
  },
};

module.exports = nextConfig;
