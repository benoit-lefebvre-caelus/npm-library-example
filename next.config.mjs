/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { dev }) {
    if (dev) {
      // Create a new object instead of mutating the existing one
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [ 
            '**/.next/**', 
            '**/node_modules/**',
            '**/.nyc_output/**',
            '**/coverage/**',
            '**/dist/**',
            '**/build/**',
            '**/out/**',
            '**/.vercel/**',
            '**/.git/**'
        ],
      };
    }
    return config;
  }
};

export default nextConfig;
