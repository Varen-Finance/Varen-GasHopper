import Container from '../../components/Container'
import Head from 'next/head'
import DoubleGlowShadow from 'app/components/DoubleGlowShadow'
import Row from 'app/components/Row'
import { classNames } from 'app/functions'

export default function Home() {
  return (
    <Container id="home-page" className="py-4 md:py-8 lg:py-10 lg:px-6">
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
      <DoubleGlowShadow>
        <Row justify="space-between">
          <div
            className={classNames(
              'w-full p-4 border rounded bg-varen-darkest-blue border-varen-blue',
              'md:w-2/5 md:mr-2'
            )}
          ></div>
          <div className={classNames('w-full p-4', 'md:w-1/5')}></div>
          <div
            className={classNames(
              'w-full p-4 border rounded bg-varen-darkest-blue border-varen-blue',
              'md:w-2/5 md:ml-2'
            )}
          ></div>
        </Row>
      </DoubleGlowShadow>
    </Container>
  )
}
