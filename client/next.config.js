/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      domains: ["images.unsplash.com", "images.pexels.com"],
   },
   async rewrites() {
      return [
         {
            source: "/:path*",
            destination: `${process.env.NEXT_PUBLIC_BASE_URL}/:path*`,
            basePath: false,
         },
      ];
   },
};

module.exports = nextConfig;
