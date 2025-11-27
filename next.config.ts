/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname, // Ensures this folder is the root
  },

  allowedDevOrigins: [
    "http://10.217.85.160:3000", // Allow your LAN IP
    "http://localhost:3000",
  ],
};

export default nextConfig;
