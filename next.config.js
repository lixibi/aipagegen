/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-image-domain.com'], // 添加你的图片域名
  },
  eslint: {
    ignoreDuringBuilds: true, // 在构建过程中忽略 ESLint 错误
  },
}

module.exports = nextConfig 