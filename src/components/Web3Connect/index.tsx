import Button, { ButtonProps } from '../Button'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useWeb3Modal } from '@web3modal/react'

export default function Web3Connect({ color = 'blue', size = 'sm', className = '', ...rest }: ButtonProps) {
  const { i18n } = useLingui()
  const { open } = useWeb3Modal()
  return (
    <Button
      id="connect-wallet"
      onClick={() => open()}
      variant="outlined"
      color={color}
      className={className}
      size={size}
      {...rest}
    >
      {i18n._(t`Connect to a wallet`)}
    </Button>
  )
}
