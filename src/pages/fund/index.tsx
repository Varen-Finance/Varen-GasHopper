import Container from '../../components/Container'
import Head from 'next/head'
import DoubleGlowShadow from 'app/components/DoubleGlowShadow'
import { classNames } from 'app/functions'
import Image from 'next/image'
import Typography from 'app/components/Typography'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Web3Network from 'app/components/Web3Network'
import { ACTIVATED_NETWORKS, SUPPORTED_NETWORKS } from 'app/constants'
import { useActiveWeb3React } from 'app/services/web3'
import { ChainId } from '@sushiswap/core-sdk'
import { NETWORK_ICON, NETWORK_LABEL } from 'app/config/networks'

export default function Home() {
  const { i18n } = useLingui()
  const { chainId } = useActiveWeb3React()

  return (
    <Container id="home-page" className="p-4 md:py-10">
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
        <section className={classNames('flex w-full flex-wrap', 'md:flex-nowrap md:justify-between')}>
          <div className={classNames('w-full', 'md:w-2/5 md:flex')}>
            <div
              className={classNames(
                'w-full p-4 border rounded bg-varen-darkest-blue border-varen-blue',
                'md:flex md:flex-wrap md:h-full md:content-start'
              )}
            >
              <Typography weight={700} variant="lg">
                {i18n._(t`Fund your wallet with...`)}
              </Typography>
              <Typography variant="sm" className="text-secondary">
                {i18n._(t`1. Select the Network to fund your wallet from`)}
              </Typography>
              <div className="flex items-center w-full mt-6">
                <Web3Network variant={'large'} />
              </div>
            </div>
          </div>
          <div className={classNames('flex w-full p-10 justify-center items-center', 'md:p-4 md:w-1/5')}>
            <div
              className={classNames(
                'block rotate-90 relative h-[40px] w-[65px]',
                'md:flex md:w-full md:h-full md:max-w-[100px] md:max-h-full md:rotate-0 '
              )}
            >
              <Image
                src="https://res.cloudinary.com/varen-finance/image/upload/v1664737369/arrow_vdhwyu.svg"
                alt="Arrow"
                width={129}
                height={80}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          <div className={classNames('w-full', 'md:w-2/5 md:flex')}>
            <div
              className={classNames(
                'w-full p-4 border rounded bg-varen-darkest-blue border-varen-blue',
                'md:flex md:flex-wrap md:h-full md:content-start'
              )}
            >
              <Typography weight={700} variant="lg">
                {i18n._(t`Fund your wallet on...`)}
              </Typography>
              <Typography variant="sm" className="text-secondary">
                {i18n._(t`2. Select the Networks you want to fund your wallet on`)}
              </Typography>
              <div className={classNames('grid grid-flow-row-dense grid-cols-1 gap-4 mt-6', 'md:grid-cols-3')}>
                {ACTIVATED_NETWORKS.map((key: ChainId, i: number) => {
                  if (chainId === key) return null
                  const isActive = false
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        console.debug(`Selecting ${key}`, SUPPORTED_NETWORKS[key])
                      }}
                      className={classNames(
                        'flex items-center gap-4 w-full px-2 py-2 rounded border',
                        isActive ? 'bg-varen-blue' : 'bg-varen-darkest-blue hover:bg-varen-dark-blue',
                        isActive ? 'border-varen-blue hover:border-varen-darkest-blue' : 'border-varen-blue'
                      )}
                    >
                      <Image
                        src={NETWORK_ICON[key]}
                        alt="Switch Network"
                        className="rounded-md"
                        width="32px"
                        height="32px"
                      />
                      <Typography weight={700} className="text-high-emphesis">
                        {NETWORK_LABEL[key]}
                      </Typography>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      </DoubleGlowShadow>
    </Container>
  )
}
