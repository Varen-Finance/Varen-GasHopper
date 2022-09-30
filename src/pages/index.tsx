import Container from '../components/Container'
import Head from 'next/head'

export default function Dashboard() {
  return (
    <Container id="dashboard-page" className="py-4 md:py-8 lg:py-12" maxWidth="2xl">
      <Head>
        <title>Dashboard | VarenX</title>
        <meta name="fortmatic-site-verification" content="IYT2GS7WhWUUGBhE" />
        <meta property="og:title" content="Varen Gashopper | Multichain Faucet" />
        <meta name="twitter:title" content="Varen Gashopper | Multichain Faucet" />
        <meta
          name="description"
          content="Need gas? Fund your Ethereum, Polygon, Fantom, Avalanche, BNB Chain and/or Aribtrum Wallet easily."
        />
        <meta
          property="og:description"
          content="Need gas? Fund your Ethereum, Polygon, Fantom, Avalanche, BNB Chain and/or Aribtrum Wallet easily."
        />
        <meta
          name="twitter:description"
          content="Need gas? Fund your Ethereum, Polygon, Fantom, Avalanche, BNB Chain and/or Aribtrum Wallet easily."
        />
      </Head>
    </Container>
  )
}
