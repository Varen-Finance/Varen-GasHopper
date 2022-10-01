import Container from '../components/Container'
import Head from 'next/head'

export default function Dashboard() {
  return (
    <Container id="dashboard-page" className="py-4 md:py-8 lg:py-12" maxWidth="2xl">
      <Head>
        <title>Gashopper | Multichain Faucet by Varen DAO</title>
        <meta name="fortmatic-site-verification" content="IYT2GS7WhWUUGBhE" />
        <meta property="og:title" content="Gashopper | Multichain Faucet by Varen DAO" />
        <meta name="twitter:title" content="Gashopper | Multichain Faucet by Varen DAO" />
        <meta
          name="description"
          content="Fund your Ethereum, BNB-Chain, Polygon, Fantom, Arbitrum or Avalanche wallet with only one transaction"
        />
        <meta
          property="og:description"
          content="Fund your Ethereum, BNB-Chain, Polygon, Fantom, Arbitrum or Avalanche wallet with only one transaction"
        />
        <meta
          name="twitter:description"
          content="Fund your Ethereum, BNB-Chain, Polygon, Fantom, Arbitrum or Avalanche wallet with only one transaction"
        />
      </Head>
    </Container>
  )
}
