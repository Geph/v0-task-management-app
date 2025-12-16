/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // produce /out for static hosting
  basePath: '/task',       // <<< your subdirectory
  assetPrefix: '/task/',   // ensure scripts/styles point under /task
  trailingSlash: true,     // helps static hosts
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
};

export default nextConfig;
