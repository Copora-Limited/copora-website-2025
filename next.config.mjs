/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["copora.com"], // Keep existing domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "copora.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http", // Use http for the IP address
        hostname: "167.99.199.102",
        port: "",
        pathname: "/**",
      },
    ],
    unoptimized: false,
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
  },
  staticPageGenerationTimeout: 120,
};

export default nextConfig;
