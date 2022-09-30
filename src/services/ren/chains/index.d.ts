export * from '@renproject/chains-bitcoin'
export * from '@renproject/chains-ethereum'
export * from '@renproject/chains-filecoin'
export * from '@renproject/chains-terra'
declare const Chains: {
  Avalanche: import('@renproject/utils').CallableConstructor<
    typeof import('@renproject/chains-ethereum').AvalancheClass
  >
  BinanceSmartChain: import('@renproject/utils').CallableConstructor<
    typeof import('@renproject/chains-ethereum').BinanceSmartChainClass
  >
  Bitcoin: import('@renproject/utils').CallableConstructor<typeof import('@renproject/chains-bitcoin').BitcoinClass>
  BitcoinCash: import('@renproject/utils').CallableConstructor<
    typeof import('@renproject/chains-bitcoin').BitcoinCashClass
  >
  DigiByte: import('@renproject/utils').CallableConstructor<typeof import('@renproject/chains-bitcoin').DigiByteClass>
  Dogecoin: import('@renproject/utils').CallableConstructor<typeof import('@renproject/chains-bitcoin').DogecoinClass>
  Ethereum: import('@renproject/utils').CallableConstructor<typeof import('@renproject/chains-ethereum').EthereumClass>
  Fantom: import('@renproject/utils').CallableConstructor<typeof import('@renproject/chains-ethereum').FantomClass>
  Filecoin: import('@renproject/utils').CallableConstructor<typeof import('@renproject/chains-filecoin').FilecoinClass>
  Goerli: import('@renproject/utils').CallableConstructor<typeof import('@renproject/chains-ethereum').GoerliClass>
  Polygon: import('@renproject/utils').CallableConstructor<typeof import('@renproject/chains-ethereum').PolygonClass>
  Terra: import('@renproject/utils').CallableConstructor<typeof import('@renproject/chains-terra').TerraClass>
  Zcash: import('@renproject/utils').CallableConstructor<typeof import('@renproject/chains-bitcoin').ZcashClass>
}
export default Chains
