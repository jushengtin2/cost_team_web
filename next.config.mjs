/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',  // 當請求以 /api 開頭
          destination: 'https://localhost:8080/api/:path*',  // 代理到後端的 8080 端口
        },
      ];
    },
  };
  
  export default nextConfig;
  