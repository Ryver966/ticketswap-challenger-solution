/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.ticketswap.com",
      },
      {
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
