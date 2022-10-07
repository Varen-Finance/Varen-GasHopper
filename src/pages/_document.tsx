/* eslint-disable @next/next/no-document-import-in-page */
// pages/_document.js
import { Head, Html, Main, NextScript } from 'next/document'

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
        <meta property="og:image" content="https://gashopper.io/banner-application.png" />
        <meta property="og:url" content="https://gashopper.io" />
        <meta property="og:type" content="Website" />
        <meta name="twitter:image" content="https://gashopper.io/banner-application.png" />
        <meta name="twitter:card" content="summary_large_image" />^
        <meta property="og:title" content="GasHopper | Multichain Faucet by Varen DAO" />
        <meta name="twitter:title" content="GasHopper | Multichain Faucet by Varen DAO" />
        <meta
          name="description"
          content="Fund your Ethereum, Avalanche, BNB-Chain, Celo, Fantom, Moonbeam, Moonriver, Optimistic or Polygon wallet with only one transaction"
        />
        <meta
          property="og:description"
          content="Fund your Ethereum, Avalanche, BNB-Chain, Celo, Fantom, Moonbeam, Moonriver, Optimistic or Polygon wallet with only one transaction"
        />
        <meta
          name="twitter:description"
          content="Fund your Ethereum, Avalanche, BNB-Chain, Celo, Fantom, Moonbeam, Moonriver, Optimistic or Polygon wallet with only one transaction"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
