/** @type {import('next').NextConfig} */

const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
      },
      env: {
        BACKEND_URL: 'https://abdallahback-production.up.railway.app/api',
        NEXT_PUBLIC_API_URL: 'your_api_url',
      },
  
    }

module.exports = nextConfig
