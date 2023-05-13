import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useQueryClient } from '@tanstack/react-query'
import Button from 'app/components/Button'
import ChainHelper from 'app/components/ChainHelper'
import Dots from 'app/components/Dots'
import FundingCard from 'app/components/FundingCard'
import Loader from 'app/components/Loader'
import PreviousTransactions from 'app/components/PreviousTransactions'
import Typography from 'app/components/Typography'
import Web3Connect from 'app/components/Web3Connect'
import Web3Network from 'app/components/Web3Network'
import { ACTIVATED_NETWORKS, ChainId, FAUCET_ADDRESS, NETWORK_ICON, SUPPORTED_NETWORKS } from 'app/constants'
import { classNames, shortenAddress } from 'app/functions'
import { useAcceptQuote, useFaucetBalances, useGetQuote, useNativePrices, useUpdateQuoteStatus } from 'app/hooks'
import { BigNumberish, ethers } from 'ethers'
import { formatValue } from 'helpers'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  useAccount,
  useBalance,
  useFeeData,
  useNetwork,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi'
import Container from '../../components/Container'

const fallbackAddress = '0x0000000000000000000000000000000000000000'

export default function Home() {
  const queryClient = useQueryClient()
  const { i18n } = useLingui()

  // WAGMI
  const { chain } = useNetwork()
  const account = useAccount()
  const { address: currentAddress } = account
  const {
    data: walletBalanceData,
    isError: walletBalanceError,
    isLoading: walletBalanceIsLoading,
  } = useBalance({
    address: currentAddress,
    watch: true,
    cacheTime: 5_000,
    enabled: !!currentAddress,
  })
  const walletBalance = walletBalanceIsLoading ? 0 : Number(walletBalanceData?.formatted ?? 0)
  const nativeCurrencySymbol = chain?.nativeCurrency.symbol ?? 'ETH'

  // LOCAL STATES //
  const [accepted, setAccepted] = useState<boolean>(false)
  const [address, setAddress] = useState<`0x${string}`>(fallbackAddress)
  const [balances, setBalances] = useState<Record<number, number>>(null)
  const [chainId, setChainId] = useState<ChainId>(ChainId.ETHEREUM)
  const [error, setError] = useState<string | undefined>()
  const [networks, setNetworks] = useState<ChainId[] | undefined>()
  const [prices, setPrices] = useState<Record<number, number>>(null)
  const [quote, setQuote] = useState<Quote | undefined>()
  const [sent, setSent] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [sendAmount, setSendAmount] = useState<BigNumberish | undefined>()
  const [waiting, setWaiting] = useState<boolean>(false)

  // STATE CONDITIONAL WAGMI //
  const { data: feeData } = useFeeData({
    chainId: chainId,
    watch: true,
    cacheTime: 5_000,
  })

  const { config } = usePrepareSendTransaction({
    request: {
      to: FAUCET_ADDRESS,
      value: sendAmount,
      gasPrice: feeData?.gasPrice,
    },
    chainId,
    enabled: !!(chainId && quote && feeData?.gasPrice && sendAmount),
  })

  const { data: sendData, sendTransaction } = useSendTransaction(config)

  const { isFetching } = useWaitForTransaction({
    hash: sendData?.hash,
    enabled: !!sendData,
    timeout: 5_000,
  })

  // QUERIES //
  const faucetBalances = useFaucetBalances()
  const nativePrices = useNativePrices()

  // fetch quote
  const {
    isFetching: quoteIsLoading,
    data: quoteData,
    isError: isQuoteError,
    refetch: quoteRefetch,
  } = useGetQuote({ account: address ?? fallbackAddress, source: chainId, target: networks, accepted: accepted })

  // fetch quoteStatus
  const { data: quoteStatusData } = useUpdateQuoteStatus({
    account: address ?? fallbackAddress,
    cid: quote?.id,
    accepted: accepted,
  })

  // CONDITIONS //

  // Set network
  useEffect(() => {
    if (!networks?.length) {
      setNetworks([getRandomNetwork()])
    }
  }, [])

  // Set faucet balances
  useEffect(() => {
    if (faucetBalances !== null) {
      if (JSON.stringify(faucetBalances) === JSON.stringify(balances)) return
      setBalances(faucetBalances)
    }
  }, [faucetBalances])

  // Set native Prices
  useEffect(() => {
    if (nativePrices !== null) {
      if (JSON.stringify(nativePrices) === JSON.stringify(prices)) return
      setPrices(nativePrices)
    }
  }, [nativePrices])

  // Quote Updates
  useEffect(() => {
    setQuote(quoteIsLoading ? undefined : quoteData)
  }, [quoteData, quoteIsLoading])

  // If funds are sent by GasHopper, refetch allQuotes
  useEffect(() => {
    if (quoteStatusData?.send) {
      setSuccess(true)
      resetState()
      queryClient.invalidateQueries({ queryKey: ['getAllQuotes'] })
    }
  }, [quoteStatusData?.send])

  // Set sendAmount when a quote is available
  useEffect(() => {
    if (quote?.incomming_rate) {
      setSendAmount(ethers.BigNumber.from(ethers.utils.parseUnits(quote.incomming_rate.toString())))
    }
  }, [quote?.incomming_rate])

  // disconnect or wallet change
  useEffect(() => {
    if (!account.isConnected && address !== fallbackAddress) {
      setAddress(fallbackAddress)
      resetState()
      return
    }

    if (account.isConnected && currentAddress !== address) {
      setAddress(currentAddress)
      resetState()
    }
  }, [account.isConnected, address, currentAddress])

  // ChainID changed
  useEffect(() => {
    if (chain?.id !== chainId) {
      setChainId(chain?.id ?? ChainId.ETHEREUM)
      resetState()
      setNetworks([getRandomNetwork()])
    }
  }, [chain?.id, chainId])

  // transaction sent
  useEffect(() => {
    if (isFetching) {
      setWaiting(false)
      setSent(isFetching && !success && accepted)
    }
  }, [isFetching, success, accepted])

  // ERROR HANDLING
  useEffect(() => {
    if (waiting || sent || success) return

    if (walletBalanceError) {
      setError(i18n._(t`Fetching wallet balance failed`))
      return
    }

    if (isQuoteError) {
      setError(i18n._(t`Failed to fetch quote`))
      return
    }

    if (quote?.incomming_rate > walletBalance) {
      setError(i18n._(t`Your ${nativeCurrencySymbol} balance is insufficient`))
      return
    }

    if (quote?.outgoing.length) {
      quote.outgoing.forEach((oCID: ChainId, index: number) => {
        if (faucetBalances[oCID] < quote.outgoing_rates[index]) {
          const network = SUPPORTED_NETWORKS[oCID].nativeCurrency.name
          setError(i18n._(t`GasHopper wallet balance on ${network} insuficcient`))
        }
      })
    }

    if (error) setError(undefined)
  }, [
    walletBalanceError,
    isQuoteError,
    walletBalance,
    quote?.incomming_rate,
    quote?.outgoing.length,
    faucetBalances,
    waiting,
    success,
    sent,
  ])

  // LOCAL FUNCTIONS
  const acceptQuote = async () => {
    if (account.isConnected && quote && quote.id) {
      const acceptedQuote = await useAcceptQuote(quote.id, address)
      if (acceptedQuote === 'accepted 1 contract(s)') {
        queryClient.invalidateQueries({ queryKey: ['getAllQuotes', 'updateQuoteStatus'] })
        setAccepted(true)
      }
    }
  }

  // get random network
  const getRandomNetwork = () => {
    const randomNetworkId = ACTIVATED_NETWORKS[Math.floor(Math.random() * ACTIVATED_NETWORKS.length)]
    if (randomNetworkId === chainId) return chainId === ChainId.ETHEREUM ? ChainId.MATIC : ChainId.ETHEREUM
    return randomNetworkId
  }

  // change networks and refetch quote
  const changeNetworks = (cID: ChainId) => {
    setSuccess(false)
    const selectedNetworks = networks
    if (selectedNetworks.indexOf(cID) > -1) {
      const newNetworks = []
      selectedNetworks.map((chainID) => {
        if (chainID !== cID) newNetworks.push(chainID)
      })
      setNetworks(newNetworks)
    } else {
      setNetworks((networks) => [...networks, cID])
    }
    quoteRefetch()
  }

  // send funds to GasHopper
  const handleSend = () => {
    if (!waiting) {
      sendTransaction?.()
      setWaiting(true)
    }
  }

  // Reset all states
  const resetState = () => {
    setAccepted(false)
    setAddress(account.isConnected ? account.address : fallbackAddress)
    setError(undefined)
    setQuote(undefined)
    setSent(false)
    setSendAmount(undefined)
    setWaiting(false)
    queryClient.invalidateQueries({ queryKey: ['getQuote'] })
  }

  return (
    <Container id="home-page" className="p-4 md:py-10">
      <Head>
        <title>GasHopper | Multichain Faucet by Varen DAO</title>
        <meta name="fortmatic-site-verification" content="IYT2GS7WhWUUGBhE" />
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
      <section className={classNames('flex w-full flex-wrap', 'md:flex-nowrap md:justify-between')}>
        <div className={classNames('w-full', 'md:w-2/5 md:flex')}>
          <div
            className={classNames(
              'w-full p-4 border rounded bg-varen-darkest-blue border-varen-blue',
              'md:flex md:flex-wrap md:h-full md:content-start'
            )}
          >
            <Typography weight={700} variant="lg" className="w-full uppercase">
              {i18n._(t`Send`)}
            </Typography>
            <Typography variant="sm" className="w-full text-secondary">
              {i18n._(t`1. Select the Network to fund your wallet from`)}
            </Typography>
            <div className={classNames('flex w-full mt-4 flex-wrap', 'md:flex-nowrap')}>
              <Web3Network variant={'large'} />
              <div className="flex flex-wrap items-center content-center w-full mt-4 md:mt-0 md:ml-4 md:w-auto">
                <Typography variant="sm" className="w-full">
                  {!quoteIsLoading && quote?.incomming_rate ? (
                    `${quote.incomming_rate} ${nativeCurrencySymbol}`
                  ) : (
                    <Loader />
                  )}
                </Typography>
                <Typography variant="sm" className="w-full italic text-secondary">
                  {!quoteIsLoading && quote ? (
                    `~${formatValue(quote.incomming_in_usd, 2, 2, true, '$')}`
                  ) : (
                    <Dots>~$</Dots>
                  )}
                </Typography>
              </div>
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
            <Image src="https://gashopper.io/images/misc/arrow.svg" alt="Arrow" width={129} height={80} />
          </div>
        </div>
        <div className={classNames('w-full', 'md:w-2/5 md:flex')}>
          <div
            className={classNames(
              'w-full p-4 border rounded bg-varen-darkest-blue border-varen-blue',
              'md:flex md:flex-wrap md:h-full md:content-start'
            )}
          >
            <Typography weight={700} variant="lg" className="w-full uppercase">
              {i18n._(t`Receive`)}
            </Typography>
            <Typography variant="sm" className="w-full text-secondary">
              {i18n._(t`2. Select the Networks you want to fund your wallet on`)}
            </Typography>
            <div className={classNames('flex w-full mt-2 flex-wrap')}>
              {ACTIVATED_NETWORKS.map((key: ChainId, i: number) => {
                if (chainId === key) return null
                const isActive = networks && networks.indexOf(key) > -1
                return (
                  <ChainHelper key={i} text={SUPPORTED_NETWORKS[key].chainName}>
                    <button
                      onClick={() => {
                        changeNetworks(key)
                      }}
                      disabled={isActive && networks.length === 1}
                      className={classNames(
                        'flex items-center px-2 py-2 mt-2 rounded border mr-2 w-[48px]',
                        isActive ? 'bg-varen-blue' : 'bg-varen-darkest-blue hover:bg-varen-dark-blue',
                        isActive ? 'border-varen-blue hover:border-varen-darkest-blue' : 'border-varen-blue',
                        'disabled:hover:border-varen-blue disabled:opacity-60 disabled:pointer-events-none'
                      )}
                    >
                      <Image
                        src={NETWORK_ICON[key]}
                        alt={SUPPORTED_NETWORKS[key].chainName}
                        className="rounded-md"
                        width={32}
                        height={32}
                      />
                    </button>
                  </ChainHelper>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      <section className={classNames('flex w-full flex-wrap', 'md:flex-nowrap md:justify-between')}>
        <div className={classNames('w-full mt-4 order-2', 'md:w-2/5 md:order-1')}>
          {error ? (
            <Button
              onClick={(e) => {
                e.preventDefault()
              }}
              disabled={true}
              variant="outlined"
              color="red"
              className="flex justify-center w-full text-white"
            >
              {error}
            </Button>
          ) : (
            <>
              {account.isConnected ? (
                <>
                  {accepted ? (
                    <>
                      {sent ? (
                        <Button
                          onClick={(e) => {
                            e.preventDefault()
                          }}
                          disabled={true}
                          variant="outlined"
                          color="blue"
                          className="flex justify-center w-full text-white"
                        >
                          <Dots>{i18n._(t`Waiting for the transactions to be completed`)}</Dots>
                        </Button>
                      ) : (
                        <Button
                          onClick={(e) => {
                            e.preventDefault()
                            handleSend()
                          }}
                          disabled={waiting}
                          variant="outlined"
                          color="blue"
                          className="flex justify-center w-full text-white"
                        >
                          {waiting ? (
                            <Dots>{i18n._(t`Please confirm the transaction`)}</Dots>
                          ) : (
                            i18n._(t`Send ${nativeCurrencySymbol}`)
                          )}
                        </Button>
                      )}
                    </>
                  ) : (
                    <Button
                      onClick={(e) => {
                        e.preventDefault()
                        if (success) {
                          setSuccess(false)
                          resetState()
                        } else {
                          if (quote) {
                            acceptQuote()
                          }
                        }
                      }}
                      variant="outlined"
                      color="blue"
                      className="flex justify-center w-full text-white"
                    >
                      {success ? (
                        i18n._(t`Funds send successfully!`)
                      ) : !quoteIsLoading ? (
                        i18n._(t`Accept Rate`)
                      ) : (
                        <Dots>{i18n._(t`Loading Rate`)}</Dots>
                      )}
                    </Button>
                  )}
                </>
              ) : (
                <Web3Connect
                  style={{ paddingTop: '8px', paddingBottom: '8px' }}
                  color="gray"
                  className="w-full text-white"
                />
              )}
            </>
          )}
        </div>
        {networks && (
          <div className={classNames('w-full oder-1', 'md:w-2/5 md:ml-1/5 md:order-2')}>
            {networks.map((oCID: ChainId) => {
              let amount = null
              if (quote?.outgoing_rates) {
                quote.outgoing.forEach((rateCID, i) => {
                  if (rateCID === oCID) amount = quote.outgoing_rates[i]
                })
              }
              return (
                <FundingCard
                  key={oCID}
                  amount={amount}
                  nativeCurrency={SUPPORTED_NETWORKS[oCID].nativeCurrency.symbol}
                  recipient={!account.isConnected ? 'Your Wallet' : shortenAddress(address, 8)}
                  chainId={oCID}
                />
              )
            })}
            <FundingCard
              amount={
                quote?.incomming_rate ? quote.incomming_rate * (quote.fees_in_usd / quote.incomming_in_usd) : null
              }
              nativeCurrency={nativeCurrencySymbol}
              recipient={i18n._(t`Varen DAO Treasury`)}
              chainId={chainId}
            />
          </div>
        )}
      </section>
      <PreviousTransactions account={address} />
    </Container>
  )
}
