const defaultTheme = require('tailwindcss/defaultTheme')

const linguiConfig = require('./lingui.config.js')
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
    domains: ['logos.varen.finance'],
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
