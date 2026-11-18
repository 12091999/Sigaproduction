/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export', // Menghasilkan file statis HTML/CSS/JS
  images: {
    unoptimized: true, // Wajib agar komponen <Image> Next.js tidak error di WordPress
  },
}

export default nextConfig
