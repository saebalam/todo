/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
      },
    images: {
        remotePatterns: [
        {
            protocol: 'https',
            hostname: 'www.flaticon.com',
            port: '',
            pathname: '/**',
        },
       
        ],
    },
};

export default nextConfig;
