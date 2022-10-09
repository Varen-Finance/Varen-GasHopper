import { ChainId } from '@sushiswap/core-sdk'
import { NETWORK_ICON } from 'app/config/networks'
import { classNames } from 'app/functions'
import Typography from '../Typography'
import Image from 'next/image'
import { useNativePrice } from 'app/hooks'
import { useEffect, useState } from 'react'
import Dots from '../Dots'
import { formatValue } from 'helpers'

interface Props {
  chainId: ChainId
  recipient: string
  amount: number
  nativeCurrency: string
}

const FundingCard = ({ amount, chainId, nativeCurrency, recipient }: Props) => {
  const [price, setPrice] = useState<string | undefined>()

  const getPrice = async (a: number) => {
    const priceBase = await useNativePrice(chainId)
    setPrice(formatValue(priceBase * a, 2, 2, true, '$'))
  }

  useEffect(() => {
    getPrice(amount)
    return () => {}
  }, [amount])

  return (
    <div
      className={classNames(
        'w-full mt-4 px-4 pt-2 pb-1 border rounded bg-varen-darkest-blue border-varen-blue',
        'md:flex md:flex-wrap md:content-start'
      )}
    >
      <div className="flex items-center w-full">
        <Image src={NETWORK_ICON[chainId]} alt={nativeCurrency} className="rounded-md" width={40} height={40} />
        <div className="flex flex-wrap">
          <Typography weight={700} className="w-full pl-4">
            {recipient}
          </Typography>
          <Typography className="w-full pl-4 text-secondary">{`${amount} ${nativeCurrency}`}</Typography>
          <Typography variant="sm" className="w-full pl-4 italic text-secondary">
            {price ? `~${price}` : <Dots>~$</Dots>}
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default FundingCard
