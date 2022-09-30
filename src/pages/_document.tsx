/* eslint-disable @next/next/no-document-import-in-page */
// pages/_document.js
import { Head, Html, Main, NextScript } from 'next/document'

const APP_NAME = 'VarenX'
const APP_DESCRIPTION =
  'A cross-chain swapping dApp powered by Ren and built by Varen Finance, an Ethereum based multi-chain DeFi hub.'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000120" />
        <meta name="msapplication-TileColor" content="#000120" />
        <meta name="theme-color" content="#000120" />
        <meta property="og:image" content="https://varenx.com/banner-application.png" />
        <meta property="og:url" content="https://varenx.com" />
        <meta property="og:type" content="Website" />
        <meta name="twitter:image" content="https://varenx.com/banner-application.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
