import { classNames } from 'app/functions'
import { useEffect, useState } from 'react'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ChainId, NETWORK_ICON, SUPPORTED_NETWORKS } from 'app/constants'
import { useAllQuotes } from 'app/hooks'
import moment from 'moment'
import Image from 'next/image'
import Dots from '../Dots'
import ExternalLink from '../ExternalLink'
import Typography from '../Typography'

interface Props {
  account: string
}

const FundingCard = ({ account }: Props) => {
  const { i18n } = useLingui()
  const [allQuotes, setAllQuotes] = useState<Quote[]>([])

  const { isFetching, data } = useAllQuotes({ account })

  const getAllQuotes = () => {
    if (isFetching || !data) return
    const allNewQuotes = data.sort((a, b) => {
      const keyA = a.id
      const keyB = b.id
      if (keyA > keyB) return -1
      if (keyA < keyB) return 1
      return 0
    })

    setAllQuotes(allNewQuotes)
  }

  useEffect(() => {
    getAllQuotes()
  }, [data])

  return account && allQuotes.length > 0 ? (
    <section className={classNames('w-full flex flex-wrap')}>
      <Typography weight={700} variant="lg" className="w-full mt-10 uppercase">
        {i18n._(t`Recent Transactions`)}
      </Typography>

      {allQuotes.map((quote: Quote, index: number) => {
        const nativeToken = SUPPORTED_NETWORKS[quote.incomming].nativeCurrency.symbol
        const created = moment(quote.createdAt)
        const now = moment(
          new Date().toLocaleString('en-us', {
            timeZone: 'UTC',
          })
        )
        const difference = now.diff(created, 'minutes')
        return (
          <div
            key={index}
            className={classNames(
              'w-full mt-2 px-4 pt-2 border rounded bg-varen-darkest-blue border-varen-blue',
              'md:flex md:flex-nowrap md:content-start'
            )}
          >
            <Typography variant="sm" className={classNames('w-full mb-1', ' md:mb-0 md:w-[170px]')}>
              {created.format('MMM Do YYYY, h:mma')}
            </Typography>
            <div className={classNames('flex w-full mb-2', 'md:w-[240px] md:mb-0')}>
              <div className="w-[20px] h-[20px] block relative">
                <Image
                  src={NETWORK_ICON[quote.incomming]}
                  alt={nativeToken}
                  className="rounded-md"
                  width={20}
                  height={20}
                />
              </div>
              <Typography variant="sm" className="pl-2">
                {`${quote.incomming_rate} ${nativeToken}`}
              </Typography>
            </div>
            <div
              className={classNames(
                'rotate-90 ml-2 w-[30px] h-[40px] block relative',
                'md:rotate-0 md:w-[40px] md:h-[20px] '
              )}
            >
              <Image src="https://gashopper.io/images/misc/arrow.svg" alt="Arrow" width={129} height={80} />
            </div>
            <div className={classNames('flex content-start flex-wrap mt-2 w-full', 'md:mt-0 md:w-[480px] md:ml-4')}>
              {quote.outgoing.map((oCID: ChainId, oIndex: number) => {
                const oNative = SUPPORTED_NETWORKS[oCID].nativeCurrency.symbol
                return (
                  <div key={`${index}-${oIndex}`} className={classNames('flex w-full flex-wrap', 'md:flex-nowrap')}>
                    <div className={classNames('flex w-full mb-2', 'md:w-[230px]')}>
                      <div className="w-[20px] h-[20px] block relative">
                        <Image src={NETWORK_ICON[oCID]} alt={oNative} className="rounded-md" width={20} height={20} />
                      </div>
                      <Typography variant="sm" className="pl-2 w-[210px]">
                        {`${quote.outgoing_rates[oIndex]} ${oNative}`}
                      </Typography>
                    </div>
                    {quote.send && quote.send_tx[oIndex].length > 1 ? (
                      <Typography variant="sm" className={classNames('pt-1 pb-2', 'md:pt-0 md:pb-0 md:pl-2')}>
                        <ExternalLink
                          href={`${SUPPORTED_NETWORKS[oCID].blockExplorerUrls[0]}/tx/${quote.send_tx[oIndex]}`}
                        >
                          {i18n._(t`Funds sent`)}
                        </ExternalLink>
                      </Typography>
                    ) : (
                      <>
                        {difference > 60 ? (
                          <Typography
                            variant="sm"
                            className={classNames('pt-1 pb-2 text-red', 'md:pt-0 md:pb-0 md:pl-2')}
                          >
                            {i18n._(t`Rate Expired`)}
                          </Typography>
                        ) : (
                          <Typography variant="sm" className={classNames('pt-1 pb-2', 'md:pt-0 md:pb-0 md:pl-2')}>
                            <Dots>{i18n._(t`Pending`)}</Dots>
                          </Typography>
                        )}
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </section>
  ) : null
}

export default FundingCard
