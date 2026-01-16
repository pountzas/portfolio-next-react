export default {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "repository-images.githubusercontent.com"
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com"
      }
    ],
    // Optimize image loading
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },

  // Bundle optimization - disabled optimizeCss due to missing critters dependency
  // experimental: {
  //   optimizeCss: true,
  // },

  // Compression
  compress: true,

  // Performance optimizations
  poweredByHeader: false

  // Bundle analyzer (uncomment to analyze bundle size)
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   if (!dev && !isServer) {
  //     config.plugins.push(
  //       new webpack.DefinePlugin({
  //         __BUNDLE_ANALYZE__: JSON.stringify(process.env.ANALYZE === 'true'),
  //       })
  //     );
  //   }
  //   return config;
  // },
};
