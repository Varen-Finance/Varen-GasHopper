import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import VAREN_ROUTER_ABI from '../../constants/abis/varen-router'
import { VARENX_ROUTER_FEE, VARENX_ROUTER_PERCENTAGE_DIVIDER } from './consts'
import { ContractCall } from '@renproject/interfaces'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import router from 'app/config/router'
import { ChainId } from '@sushiswap/core-sdk'

export function calculateVarenRouterFee(amount: BigNumber): BigNumber {
  const fee = amount.times(VARENX_ROUTER_FEE).dividedBy(VARENX_ROUTER_PERCENTAGE_DIVIDER).dp(0, BigNumber.ROUND_DOWN)
  return fee
}

export class VarenRouterContract extends ethers.Contract {
  constructor(provider: any, chainId: ChainId = ChainId.ETHEREUM) {
    super(router[chainId], VAREN_ROUTER_ABI, provider)
  }

  getContractCall(sender: string, chainId: ChainId): ContractCall {
    return {
      sendTo: router[chainId],
      contractFn: 'swap',
      contractParams: [
        {
          name: 'sender',
          type: 'address',
          value: sender,
        },
        {
          name: 'mintToken',
          type: 'address',
          notInPayload: true,
          value: '0x0000000000000000000000000000000000000000',
        },
        {
          name: 'burnToken',
          type: 'address',
          notInPayload: true,
          value: '0x0000000000000000000000000000000000000000',
        },
        {
          name: 'burnAmount',
          type: 'uint256',
          notInPayload: true,
          value: 0,
        },
        {
          name: 'burnSendTo',
          type: 'bytes',
          notInPayload: true,
          value: Buffer.from(''),
        },
        {
          components: [
            { type: 'address', name: 'srcToken' },
            { type: 'uint256', name: 'srcAmount' },
            { type: 'address', name: 'destToken' },
            { type: 'bytes', name: 'data' },
          ],
          name: 'swapVars',
          type: 'tuple(address,uint256,address,bytes)',
          notInPayload: true,
          value: [
            '0x0000000000000000000000000000000000000000',
            0,
            '0x0000000000000000000000000000000000000000',
            Buffer.from(''),
          ],
        },
      ],
    }
  }
}
