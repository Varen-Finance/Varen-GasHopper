import Container from '../../components/Container'
import Head from 'next/head'
import { classNames, shortenAddress } from 'app/functions'
import Image from 'next/image'
import Typography from 'app/components/Typography'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Web3Network from 'app/components/Web3Network'
import { ACTIVATED_NETWORKS, FAUCET_ADDRESS, SUPPORTED_NETWORKS } from 'app/constants'
import { useActiveWeb3React } from 'app/services/web3'
import { ChainId } from '@sushiswap/core-sdk'
import { NETWORK_ICON, NETWORK_LABEL } from 'app/config/networks'
import { useEffect, useState } from 'react'
import { useAcceptQuote, useGetQuote, useUpdateQuoteStatus } from 'app/hooks'
import Loader from 'app/components/Loader'
import Button from 'app/components/Button'
import Web3Connect from 'app/components/Web3Connect'
import FundingCard from 'app/components/FundingCard'
import Dots from 'app/components/Dots'
import { BigNumber } from '@ethersproject/bignumber'
import { ethers } from 'ethers'
import PreviousTransactions from 'app/components/PreviousTransactions'

export default function Home() {
  const { i18n } = useLingui()
  const { chainId, account, library } = useActiveWeb3React()
  const [networks, setNetworks] = useState<ChainId[] | undefined>()
  const [quote, setQuote] = useState<Quote | undefined>()
  const [ready, setReady] = useState<boolean>(false)
  const [nativeCurrency, setNativeCurrency] = useState<string>(
    SUPPORTED_NETWORKS[ChainId.ETHEREUM].nativeCurrency.symbol
  )
  const [intervalId, setIntervalId] = useState<number>(0)
  const [accepted, setAccepted] = useState<boolean>(false)
  const [waiting, setWaiting] = useState<boolean>(false)
  const [sent, setSent] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const calculateGasMargin = (value: BigNumber): BigNumber => {
    return value.mul(BigNumber.from(10000 + 2000)).div(BigNumber.from(10000))
  }

  const getQuote = async () => {
    setAccepted(false)
    setReady(false)
    const newQuote = await useGetQuote(account, chainId, networks)
    if (
      networks.length === newQuote.outgoing.length &&
      newQuote.outgoing.every((item) => networks.indexOf(item) > -1)
    ) {
      setQuote(newQuote)
      setReady(true)
    }
  }

  const acceptQuote = async () => {
    if (account && quote && quote.id) {
      const acceptedQuote = await useAcceptQuote(quote.id, account)
      if (acceptedQuote === 'accepted 1 contract(s)') {
        clearInterval(intervalId)
        setAccepted(true)
      } else {
        getQuote()
      }
    }
  }

  const updateQuoteStatus = async () => {
    if (account && quote && quote.id) {
      const updatedQuote = await useUpdateQuoteStatus(quote.id, account)
      if (updatedQuote.send) {
        resetState()
      }
    }
  }

  const changeNetworks = (cID: ChainId) => {
    const selectedNetworks = networks
    if (selectedNetworks.indexOf(cID) > -1) {
      if (selectedNetworks.length === 1) return
      const newNetworks = []
      selectedNetworks.map((chainID) => {
        if (chainID !== cID) newNetworks.push(chainID)
      })
      setNetworks(newNetworks)
    } else {
      setNetworks((networks) => [...networks, cID])
    }
  }

  const sendFunds = async () => {
    const tx = {
      from: account,
      to: FAUCET_ADDRESS,
      value: ethers.BigNumber.from(ethers.utils.parseUnits(quote.incomming_rate.toString(), 18))._hex,
    }

    const call = await library
      .estimateGas(tx)
      .then((gasEstimate) => {
        return {
          gasEstimate,
        }
      })
      .catch((gasError) => {
        setError(i18n._(t`Gas estimate failed, trying eth_call to extract error`))
        return library
          .call(tx)
          .then(() => {
            setError(i18n._(t`Unexpected successful call after failed estimate gas ${gasError}`))
            return call
          })
          .catch((callError) => {
            setError(i18n._(t`Call threw error ${callError}`))
            return call
          })
      })

    return library
      .getSigner()
      .sendTransaction({
        from: account,
        to: FAUCET_ADDRESS,
        ...(call.gasEstimate ? { gasLimit: calculateGasMargin(call.gasEstimate) } : {}),
        gasPrice: undefined,
        value: tx.value,
      })
      .then((response) => {
        if (response.hash) {
          setWaiting(false)
          setSent(true)
        }
      })
      .catch((error) => {
        if (error?.code !== 4001) {
          setError(i18n._(t`An error uccured: ${error.message}`))
        }
        setWaiting(false)
      })
  }

  const resetState = () => {
    clearInterval(intervalId)
    setIntervalId(0)
    setError('')
    setWaiting(false)
    setSent(false)
    setReady(false)
    setQuote(undefined)
    setNativeCurrency(SUPPORTED_NETWORKS[chainId ? chainId : ChainId.ETHEREUM].nativeCurrency.symbol)
    setNetworks([chainId === ChainId.ETHEREUM ? ChainId.MATIC : ChainId.ETHEREUM])
  }

  useEffect(() => {
    resetState()
  }, [chainId, account])

  useEffect(() => {
    const quoteEqualsNetworks =
      quote &&
      quote?.outgoing &&
      quote?.incomming &&
      quote?.incomming === chainId &&
      networks.length === quote?.outgoing.length &&
      quote.outgoing.every((item) => networks.indexOf(item) > -1)
    if (networks && chainId && account && networks.length >= 1 && !quoteEqualsNetworks) getQuote()
  }, [networks])

  useEffect(() => {
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(0)
    }

    const newIntervalId = setInterval(() => {
      if (networks && networks.length > 0) getQuote()
    }, 60000)
    setIntervalId(Number(newIntervalId))

    return () => clearInterval(intervalId)
  }, [networks])

  useEffect(() => {
    if (error !== '') {
      console.error(error)
    }
  })

  useEffect(() => {
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(0)
    }

    if (sent) {
      const newIntervalId = setInterval(() => {
        updateQuoteStatus()
      }, 60000)
      setIntervalId(Number(newIntervalId))
    }

    return () => clearInterval(intervalId)
  }, [sent])

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
              {account && (
                <div className="flex flex-wrap items-center content-center mt-4 md:mt-0 md:ml-4">
                  <Typography variant="sm" className="w-full">
                    {ready && quote ? `${quote?.incomming_rate} ${nativeCurrency}` : <Loader />}
                  </Typography>
                  <Typography variant="sm" className="w-full italic text-secondary">
                    ~$100.00
                  </Typography>
                </div>
              )}
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
            <Typography weight={700} variant="lg" className="w-full uppercase">
              {i18n._(t`Receive`)}
            </Typography>
            <Typography variant="sm" className="w-full text-secondary">
              {i18n._(t`2. Select the Networks you want to fund your wallet on`)}
            </Typography>
            <div className={classNames('flex w-full mt-4')}>
              {ACTIVATED_NETWORKS.map((key: ChainId, i: number) => {
                if (chainId === key) return null
                const isActive = networks && networks.indexOf(key) > -1
                return (
                  <button
                    key={i}
                    onClick={() => {
                      changeNetworks(key)
                    }}
                    disabled={(isActive && networks.length === 1) || !ready}
                    className={classNames(
                      'flex items-center px-2 py-2 rounded border mr-2 w-[48px]',
                      isActive ? 'bg-varen-blue' : 'bg-varen-darkest-blue hover:bg-varen-dark-blue',
                      isActive ? 'border-varen-blue hover:border-varen-darkest-blue' : 'border-varen-blue',
                      'disabled:hover:border-varen-blue disabled:opacity-60'
                    )}
                  >
                    <Image
                      src={NETWORK_ICON[key]}
                      alt="Switch Network"
                      className="rounded-md"
                      width="32px"
                      height="32px"
                    />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      <section className={classNames('flex w-full flex-wrap', 'md:flex-nowrap md:justify-between')}>
        <div className={classNames('w-full mt-4 order-2', 'md:w-2/5 md:order-1')}>
          {account ? (
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
                      onClick={() => {
                        setWaiting(true)
                        sendFunds()
                      }}
                      disabled={waiting}
                      variant="outlined"
                      color="blue"
                      className="flex justify-center w-full text-white"
                    >
                      {waiting ? (
                        <Dots>{i18n._(t`Please confirm the transaction`)}</Dots>
                      ) : (
                        i18n._(t`Send ${nativeCurrency}`)
                      )}
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    if (ready && quote) {
                      acceptQuote()
                    }
                  }}
                  disabled={!ready}
                  variant="outlined"
                  color="blue"
                  className="flex justify-center w-full text-white"
                >
                  {ready ? i18n._(t`Accept Rate`) : <Dots>{i18n._(t`Loading Rate`)}</Dots>}
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
        </div>
        {account && ready && quote && quote.outgoing_rates && (
          <div className={classNames('w-full oder-1', 'md:w-2/5 md:ml-1/5 md:order-2')}>
            {quote.outgoing.map((oCID: ChainId, i: number) => {
              return (
                <FundingCard
                  key={i}
                  amount={quote.outgoing_rates[i]}
                  nativeCurrency={SUPPORTED_NETWORKS[oCID].nativeCurrency.symbol}
                  recipient={shortenAddress(account, 8)}
                  chainId={oCID}
                />
              )
            })}
            <FundingCard
              amount={quote?.incomming_rate / 10}
              nativeCurrency={nativeCurrency}
              recipient={i18n._(t`Varen DAO Treasury`)}
              chainId={chainId}
            />
          </div>
        )}
      </section>
      <PreviousTransactions account={account} />
    </Container>
  )
}
