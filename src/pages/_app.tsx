import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import Header from 'app/components/Header'
import Main from 'app/components/Main'
import { NETWORK_ICON } from 'app/constants'
import * as plurals from 'make-plural/plurals'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { WagmiConfig, configureChains, createClient } from 'wagmi'
import { arbitrum, avalanche, bsc, celo, fantom, mainnet, moonbeam, moonriver, optimism, polygon } from 'wagmi/chains'
import '../styles/index.scss'

const projectId = '80265d2a843308530e736dcd4febb0b4'

const chains = [mainnet, arbitrum, avalanche, bsc, celo, fantom, moonbeam, moonriver, polygon, optimism]

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ version: 1, chains, projectId }),
  provider,
})

const ethereumClient = new EthereumClient(wagmiClient, chains)
const queryClient = new QueryClient()

// @ts-ignore TYPE NEEDS FIXING
function App({ Component, pageProps }) {
  const router = useRouter()
  const { locale } = router
  useEffect(() => {
    // @ts-ignore TYPE NEEDS FIXING
    async function load(locale) {
      // @ts-ignore TYPE NEEDS FIXING
      i18n.loadLocaleData(locale, { plurals: plurals[locale.split('_')[0]] })
      const { messages } = await import(`@lingui/loader!./../../locale/${locale}.json?raw-lingui`)
      i18n.load(locale, messages)
      i18n.activate(locale)
    }

    load(locale)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <>
      <Head>
        <title>GasHopper | Multichain Faucet by Varen DAO</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        <meta name="fortmatic-site-verification" content="IYT2GS7WhWUUGBhE" />
      </Head>
      <WagmiConfig client={wagmiClient}>
        <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
          <QueryClientProvider client={queryClient}>
            {ready ? (
              <div className="z-0 flex flex-col items-center w-full h-full pb-16 background-gradient lg:pb-0 lg:p-1">
                <Header />
                <Main>
                  <Component {...pageProps} />
                </Main>
              </div>
            ) : null}
          </QueryClientProvider>
        </I18nProvider>
      </WagmiConfig>{' '}
      <Web3Modal
        enableNetworkView={true}
        projectId={projectId}
        ethereumClient={ethereumClient}
        chainImages={NETWORK_ICON}
      />
    </>
  )
}

export default App
