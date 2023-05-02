# [GasHopper](https://gashopper.io)

![GasHopper by Varen DAO](https://raw.githubusercontent.com/Varen-Finance/Varen-gashopper/main/public/banner-application.png)
_Fund multiple chains at once_

---

## What is GasHopper?

GasHopper is a Multi-Chain-Faucet. It operates as a 'smart wallet' that has a middleware connected to it, which is listening to incoming transactions on the wallet.

---

## Why should I use GasHopper?

Funding a wallet on a chain you never used before can be tricky. With GasHopper you can fund your EVM Wallet on all supported chains with only one transaction. GasHopper was designed to make onboarding to new chains easy.

---

## What does 'accept rate' mean?

To avoid any exploit capabilities of the dApp, you have to accept a rate of exchange, based on the current TWAP prices of the individual native tokens of the exchange process. After you accepted your rate, the middleware is looking for your deposit to the 'smart wallet' of GasHopper.
Your rate is valid for a period of 60 minutes. If you do not send any funds in that timeframe, the rate will expire and won't be served by the middleware anymore.

---

## I sent funds after rate expired. Are my funds lost?

No, your funds can not get lost on GasHopper, as the middleware is in full control of the wallet. If a rate did not get fullfilled by the middleware, it can be initiated manually by the [Varen DAO](https://varen.finance/).
Navigate to the [Varen DAO Discord server](https://discord.varen.finance/) and provide your wallet address in the Discords #support channel.

---

## My accepted rate says 'Pending...' but there is no send button to be found. Do I have to start over?

You could start over, or just send the funds of the selected source manually.
The wallet address of the GasHopper funding wallet is: `0x4Fe425C05DD4052d9ef446eCdf8b3D8fC50DEE15`
Make sure, you send the exact amount of funds (listed in the accepted rate). The middleware will pick up your transaction and execute the exchange.

---

## Why is there a 'Varen DAO Treasury' element in my rate?

GasHopper charges a 10% fee on every exchange. This fee goes into the GasHopper funding wallet and ultimately into [Varen DAO](https://varen.finance/) Treasury as protocol owned liquidity.

---

## I can't agree on a rate, as the funding wallet balance is too low?

GasHopper can only send funds from it's own wallet. If a wallet on a specific chain is empty or too low, the dApp prevents the exchange from happening.
You can either wait for the balance to be replenished by other exchanges, or navigate to the [Varen DAO Discord server](https://discord.varen.finance/) and inform the DAO via the #support channel.

---

## Where can I check the balances of the GasHopper wallet?

GasHopper uses the `varen.eth` ENS Domain.
You can check the Balances of it [here](https://zapper.fi/account/varen.eth)

---

## I got an error using GasHopper. Where do I find help?

Navigate to the [Varen DAO Discord server](https://discord.varen.finance/) and provide your wallet address in the Discords #support channel.

---

## Repository info

- based on a fork of the [sushiswap-interface](https://github.com/sushiswap/sushiswap-interface)
- wallet connector and chain interaction via [wagmi](https://github.com/wagmi-dev/wagmi)
- subject to the [MIT license](LICENSE)
