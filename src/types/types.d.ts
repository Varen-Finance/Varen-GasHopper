interface Quote {
  accepted: boolean
  address: string
  createdAt: string
  id: number
  incomming: ChainId
  incomming_rate: number
  outgoing: ChainId[]
  outgoing_rates: number[]
  send: boolean
  send_tx: string[]
}
