const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const defaultTheme = require('tailwindcss/defaultTheme')

const linguiConfig = require('./lingui.config.js')
const { ChainId } = require('@sushiswap/core-sdk')
const { locales, sourceLocale } = linguiConfig

const { screens } = defaultTheme

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// This file sets a custom webpack configuration to use your Next.js app
// https://nextjs.org/docs/api-reference/next.config.js/introduction

const nextConfig = {
  webpack: (config) => {
    config.module.rules = [
      ...config.module.rules,
      {
        resourceQuery: /raw-lingui/,
        type: 'javascript/auto',
      },
    ]

    return config
  },
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  swcMinify: false,
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
  },
  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/varen-finance/image/fetch/',
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
  i18n: {
    localeDetection: true,
    locales,
    defaultLocale: sourceLocale,
  },
  publicRuntimeConfig: {
    breakpoints: screens,
  },
}

module.exports = withPWA(withBundleAnalyzer(nextConfig))
