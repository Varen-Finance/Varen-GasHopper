interface Quote {
  accepted: boolean
  address: string
  createdAt: string
  id: number
  incomming: ChainId
  incomming_rate: number
  incomming_in_usd: number
  outgoing: ChainId[]
  outgoing_in_usd: number
  outgoing_rates: number[]
  fees_in_usd: number
  send: boolean
  send_tx: string[]
}

interface Transaction {
  blockHash: string
  blockNumber: string
  confirmations: string
  contractAddress: string
  cumulativeGasUsed: string
  from: string
  functionName: string
  gas: string
  gasPrice: string
  gasUsed: string
  hash: string
  input: string
  isError: string
  methodId: string
  nonce: string
  timeStamp: string
  to: string
  transactionIndex: string
  txreceipt_status: string
  value: string
}

interface SupportedNetworksProps {
  [key: number]: {
    chainId: string
    chainName: string
    nativeCurrency: {
      name: string
      symbol: string
      decimals: number
      price?: number
    }
    blockExplorerUrls: string[]
    blockExplorerAPIkeys: string[]
    blockStart: number
    walletBalance?: number
    transactionCount?: number
    generatedFees?: number
  }
}
