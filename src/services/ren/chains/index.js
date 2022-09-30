'use strict'
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k]
          },
        })
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        o[k2] = m[k]
      })
var __exportStar =
  (this && this.__exportStar) ||
  function (m, exports) {
    for (var p in m)
      if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p)
  }
Object.defineProperty(exports, '__esModule', { value: true })
__exportStar(require('@renproject/chains-bitcoin'), exports)
__exportStar(require('@renproject/chains-ethereum'), exports)
__exportStar(require('@renproject/chains-filecoin'), exports)
__exportStar(require('@renproject/chains-terra'), exports)
const chains_bitcoin_1 = require('@renproject/chains-bitcoin')
const chains_terra_1 = require('@renproject/chains-terra')
const chains_filecoin_1 = require('@renproject/chains-filecoin')
const chains_ethereum_1 = require('@renproject/chains-ethereum')
const Chains = {
  Avalanche: chains_ethereum_1.Avalanche,
  BinanceSmartChain: chains_ethereum_1.BinanceSmartChain,
  Bitcoin: chains_bitcoin_1.Bitcoin,
  BitcoinCash: chains_bitcoin_1.BitcoinCash,
  DigiByte: chains_bitcoin_1.DigiByte,
  Dogecoin: chains_bitcoin_1.Dogecoin,
  Ethereum: chains_ethereum_1.Ethereum,
  Fantom: chains_ethereum_1.Fantom,
  Filecoin: chains_filecoin_1.Filecoin,
  Goerli: chains_ethereum_1.Goerli,
  Polygon: chains_ethereum_1.Polygon,
  Terra: chains_terra_1.Terra,
  Zcash: chains_bitcoin_1.Zcash,
}
exports.default = Chains
//# sourceMappingURL=index.js.map
