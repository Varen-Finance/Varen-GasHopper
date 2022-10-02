const defaultTheme = require('tailwindcss/defaultTheme')

const linguiConfig = require('./lingui.config.js')
const { ChainId } = require('@sushiswap/core-sdk')
const { locales, sourceLocale } = linguiConfig

const { screens } = defaultTheme

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
  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/varen-finance/image/fetch/',
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/fund',
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

module.exports = nextConfig
