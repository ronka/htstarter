/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure path aliases
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": ".",
    };

    // RTL-specific webpack optimizations
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "unicode-bidi": false,
    };

    return config;
  },
  // Enable strict mode
  reactStrictMode: true,
  // Optimize images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.blob.vercel-storage.com",
      },
    ],
    domains: ["images.unsplash.com"],
  },
  // Configure environment variables
  env: {
    // Add any custom environment variables here
    NEXT_PUBLIC_DEFAULT_LOCALE: "he",
    NEXT_PUBLIC_RTL_ENABLED: "true",
  },
  // Internationalization configuration for RTL support
  i18n: {
    locales: ["he", "en"],
    defaultLocale: "he",
    localeDetection: false,
  },
  // Experimental features for better RTL support
  experimental: {
    optimizePackageImports: [
      "@radix-ui/react-accordion",
      "@radix-ui/react-alert-dialog",
      "@radix-ui/react-aspect-ratio",
      "@radix-ui/react-avatar",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-collapsible",
      "@radix-ui/react-context-menu",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-hover-card",
      "@radix-ui/react-label",
      "@radix-ui/react-menubar",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-popover",
      "@radix-ui/react-progress",
      "@radix-ui/react-radio-group",
      "@radix-ui/react-scroll-area",
      "@radix-ui/react-select",
      "@radix-ui/react-separator",
      "@radix-ui/react-slider",
      "@radix-ui/react-slot",
      "@radix-ui/react-switch",
      "@radix-ui/react-tabs",
      "@radix-ui/react-toast",
      "@radix-ui/react-toggle",
      "@radix-ui/react-toggle-group",
      "@radix-ui/react-tooltip",
    ],
  },
  // Compiler optimizations for RTL
  compiler: {
    // Remove console.log statements in production
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Headers configuration for RTL support
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Language",
            value: "he",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
