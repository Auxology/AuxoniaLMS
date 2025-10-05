import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tailwindui.com',
                port: '',
                pathname: '/plus-assets/**',
            },
            {
                protocol: 'https',
                hostname: 'auxonialms.t3.storage.dev',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
