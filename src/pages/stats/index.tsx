import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Typography from 'app/components/Typography'
import { ACTIVATED_NETWORKS, ChainId, NETWORK_ICON, SUPPORTED_NETWORKS } from 'app/constants'
import { classNames } from 'app/functions'
import { useFaucetBalances, useGeneratedFees, useNativePrices } from 'app/hooks'
import { formatValue } from 'helpers'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Container from '../../components/Container'

interface feeObject {
  totalFee: number
  txCount: number
}

export default function Stats() {
  const { i18n } = useLingui()
  const [chainInfo, setChainInfo] = useState<SupportedNetworksProps>(SUPPORTED_NETWORKS)
  const [totalValue, setTotalValue] = useState<number>(0)
  const [totalFees, setTotalFees] = useState<number>(0)
  const [totalTxs, setTotalTxs] = useState<number>(0)
  const [prices, setPrices] = useState<Record<number, number>>(null)
  const [balances, setBalances] = useState<Record<number, number>>(null)
  const [fees, setFees] = useState<Record<number, feeObject>>(null)

  const faucetBalances = useFaucetBalances()
  const nativePrices = useNativePrices()
  const generatedFees = useGeneratedFees()

  useEffect(() => {
    if (faucetBalances !== null) {
      if (JSON.stringify(faucetBalances) === JSON.stringify(balances)) return
      setBalances(faucetBalances)
    }
  }, [faucetBalances])

  useEffect(() => {
    if (nativePrices !== null) {
      if (JSON.stringify(nativePrices) === JSON.stringify(prices)) return
      setPrices(nativePrices)
    }
  }, [nativePrices])

  useEffect(() => {
    if (generatedFees !== null) {
      if (JSON.stringify(generatedFees) === JSON.stringify(fees)) return
      setFees(generatedFees)
    }
  }, [generatedFees])

  const updateChainInfo = async () => {
    if (balances === null || prices === null || fees === null) return
    const newChainInfo = chainInfo
    let total = 0
    let totalFees = 0
    let totalTransactions = 0
    ACTIVATED_NETWORKS.forEach(async (key: ChainId) => {
      newChainInfo[key].walletBalance = balances[key]
      newChainInfo[key].nativeCurrency.price = prices[key]
      newChainInfo[key].generatedFees = fees[key].totalFee
      totalTransactions += fees[key].txCount
      total += balances[key] * prices[key]
      totalFees += fees[key].totalFee * prices[key]
      setTotalTxs(totalTransactions)
      setChainInfo(newChainInfo)
      setTotalValue(total)
      setTotalFees(totalFees)
    })
  }

  useEffect(() => {
    updateChainInfo()
  }, [fees, balances, prices])

  return (
    <Container id="stats-page" className="p-4 md:py-10">
      <Head>
        <title>GasHopper | Stats</title>
        <meta name="fortmatic-site-verification" content="IYT2GS7WhWUUGBhE" />
        <meta property="og:title" content="GasHopper | Stats" />
        <meta name="twitter:title" content="GasHopper | Stats" />
        <meta
          name="description"
          content="GasHopper statistics. Total transactions, generated fees and wallet balances"
        />
        <meta
          property="og:description"
          content="GasHopper statistics. Total transactions, generated fees and wallet balances"
        />
        <meta
          name="twitter:description"
          content="GasHopper statistics. Total transactions, generated fees and wallet balances"
        />
      </Head>
      <section className="flex flex-wrap w-full">
        <div className={classNames('flex flex-wrap w-full mt-10 content-start', 'lg:w-3/5 lg:pr-4')}>
          <div className="flex w-full space-between">
            <Typography weight={700} variant="lg" className="flex flex-grow ">
              {i18n._(t`GasHopper funds`)}
            </Typography>
            <Typography className="flex items-end text-right text-secondary">
              {formatValue(totalValue, 2, 2, true, '$')}
            </Typography>
          </div>
          <div className="w-full mt-2 border rounded bg-varen-darkest-blue border-varen-blue">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="pl-4 py-2 text-left w-[140px]">
                    <Typography variant="base" className="text-secondary">
                      {i18n._(t`Token`)}
                    </Typography>
                  </th>
                  <th className={classNames('pl-4 py-2 text-left w-[140px] hidden', 'lg:block')}>
                    <Typography variant="base" className="text-secondary">
                      {i18n._(t`Chain`)}
                    </Typography>
                  </th>
                  <th className="py-2 pr-4 text-right">
                    <Typography variant="base" className="text-secondary">
                      {i18n._(t`Balance`)}
                    </Typography>
                  </th>
                  <th className={classNames('pr-4 py-2 text-right  hidden', 'md:block')}>
                    <Typography variant="base" className="text-secondary">
                      {i18n._(t`Price`)}
                    </Typography>
                  </th>
                  <th className="py-2 pr-4 text-right">
                    <Typography variant="base" className="text-secondary">
                      {i18n._(t`Value`)}
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ACTIVATED_NETWORKS.map((chainId: ChainId, index: number) => {
                  const nativeToken = SUPPORTED_NETWORKS[chainId].nativeCurrency.symbol
                  const networkName = SUPPORTED_NETWORKS[chainId].chainName
                  const chainWalletBalance = chainInfo[chainId].walletBalance || 0
                  const chainTokenPrice = chainInfo[chainId].nativeCurrency.price || 0

                  return (
                    <tr key={index}>
                      <td className="py-2 pl-4">
                        <div className="w-[24px] h-[24px] absolute">
                          <Image
                            src={NETWORK_ICON[chainId]}
                            alt={nativeToken}
                            className="rounded-md"
                            width={24}
                            height={24}
                          />
                        </div>
                        <Typography variant="base" className="pl-[32px]">
                          {nativeToken}
                        </Typography>
                      </td>
                      <td className={classNames('pl-4 py-2 hidden', 'lg:block')}>
                        <Typography variant="base">{networkName}</Typography>
                      </td>
                      <td className="py-2 pr-4 text-right">
                        <Typography variant="base">{`${formatValue(chainWalletBalance, 0, 4)}`}</Typography>
                      </td>
                      <td className={classNames('pr-4 py-2 text-right  hidden', 'md:block')}>
                        <Typography variant="base">{`${formatValue(chainTokenPrice, 2, 2, true, '$')}`}</Typography>
                      </td>
                      <td className="py-2 pr-4 text-right">
                        <Typography variant="base">
                          {formatValue(chainWalletBalance * chainTokenPrice, 2, 2, true, '$')}
                        </Typography>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className={classNames('flex flex-wrap w-full mt-10', 'lg:w-2/5 lg:pl-4')}>
          <div className="flex w-full space-between">
            <Typography weight={700} variant="lg" className="flex flex-grow ">
              {i18n._(t`Fees generated`)}
            </Typography>
            <Typography className="flex items-end text-right text-secondary">
              {formatValue(totalFees, 2, 2, true, '$')}
            </Typography>
          </div>

          <div className="w-full mt-2 border rounded bg-varen-darkest-blue border-varen-blue">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="pl-4 py-2 text-left w-[80px]">
                    <Typography variant="base" className="text-secondary">
                      {i18n._(t`Token`)}
                    </Typography>
                  </th>
                  <th className="py-2 pr-4 text-right">
                    <Typography variant="base" className="text-secondary">
                      {i18n._(t`Fees`)}
                    </Typography>
                  </th>
                  <th className="py-2 pr-4 text-right">
                    <Typography variant="base" className="text-secondary">
                      {i18n._(t`Value`)}
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ACTIVATED_NETWORKS.map((chainId: ChainId, index: number) => {
                  const nativeToken = SUPPORTED_NETWORKS[chainId].nativeCurrency.symbol
                  const chainFees = chainInfo[chainId].generatedFees || 0
                  const chainTokenPrice = chainInfo[chainId].nativeCurrency.price || 0

                  return (
                    <tr key={index}>
                      <td className="py-2 pl-4">
                        <div className="w-[24px] h-[24px] absolute">
                          <Image
                            src={NETWORK_ICON[chainId]}
                            alt={nativeToken}
                            className="rounded-md"
                            width={24}
                            height={24}
                          />
                        </div>
                        <Typography variant="base" className="pl-[32px]">
                          {nativeToken}
                        </Typography>
                      </td>
                      <td className="py-2 pr-4 text-right">
                        <Typography variant="base">{`${formatValue(chainFees, 0, 4)}`}</Typography>
                      </td>
                      <td className="py-2 pr-4 text-right">
                        <Typography variant="base">
                          {formatValue(chainFees * chainTokenPrice, 2, 2, true, '$')}
                        </Typography>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="w-full mt-2">
            <Typography weight={700} variant="sm" className={classNames('w-full  text-secondary', 'lg:text-right')}>
              {i18n._(t`Total transactions: ${totalTxs}`)}
            </Typography>
          </div>
        </div>
      </section>
    </Container>
  )
}
