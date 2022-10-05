import Container from '../../components/Container'
import Head from 'next/head'
import { classNames } from 'app/functions'
import Typography from 'app/components/Typography'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { FAUCET_ADDRESS } from 'app/constants'
import ExternalLink from 'app/components/ExternalLink'

export default function Faq() {
  const { i18n } = useLingui()

  return (
    <Container id="faq-page" className="p-4 md:py-10">
      <Head>
        <title>Gashopper | FAQ</title>
        <meta name="fortmatic-site-verification" content="IYT2GS7WhWUUGBhE" />
        <meta property="og:title" content="Gashopper | FAQ" />
        <meta name="twitter:title" content="Gashopper | FAQ" />
        <meta name="description" content="What is Gashopper?" />
        <meta property="og:description" content="What is Gashopper?" />
        <meta name="twitter:description" content="What is Gashopper?" />
      </Head>
      <section className={classNames('flex w-full flex-wrap', 'md:flex-nowrap md:justify-between mb-10')}>
        <div className={classNames('w-full flex flex-wrap')}>
          <Typography weight={700} variant="h2" className="w-full mt-4 uppercase md:mt-10">
            {i18n._(t`FAQ`)}
          </Typography>
          <div className="flex flex-wrap w-full px-4 py-2 mt-4 border rounded bg-varen-darkest-blue border-varen-blue">
            <Typography weight={700} variant="lg" className="w-full pt-2">
              {i18n._(t`What is Gashopper?`)}
            </Typography>
            <Typography variant="base" className="w-full text-secondary">
              {i18n._(
                t`Gashopper is a Multi-Chain-Faucet. It operates as a 'smart wallet' that has a middleware connected to it, which is listening to incoming transactions on the wallet.`
              )}
            </Typography>
          </div>
          <div className="flex flex-wrap w-full px-4 py-2 mt-4 border rounded bg-varen-darkest-blue border-varen-blue">
            <Typography weight={700} variant="lg" className="w-full pt-2">
              {i18n._(t`Why should I use Gashopper?`)}
            </Typography>
            <Typography variant="base" className="w-full text-secondary">
              {i18n._(
                t`Funding a wallet on a chain you never used before can be tricky. With Gashopper you can fund your EVM Wallet on all supported chains with only one transaction. Gashopper was designed to make onboarding to new chains easy.`
              )}
            </Typography>
          </div>
          <div className="flex flex-wrap w-full px-4 py-2 mt-4 border rounded bg-varen-darkest-blue border-varen-blue">
            <Typography weight={700} variant="lg" className="w-full pt-2">
              {i18n._(t`What does 'accept rate' mean?`)}
            </Typography>
            <Typography variant="base" className="w-full text-secondary">
              {i18n._(
                t`To avoid any exploit capabilities of the dApp, you have to accept a rate of exchange, based on the current TWAP prices of the individual native tokens of the exchange process. After you accepted your rate, the middleware is looking for your deposit to the 'smart wallet' of Gashopper.`
              )}
            </Typography>
            <Typography variant="base" className="w-full text-secondary">
              {i18n._(
                t`Your rate is valid for a period of 60 minutes. If you do not send any funds in that timeframe, the rate will expire and won't be served by the middleware anymore.`
              )}
            </Typography>
          </div>
          <div className="flex flex-wrap w-full px-4 py-2 mt-4 border rounded bg-varen-darkest-blue border-varen-blue">
            <Typography weight={700} variant="lg" className="w-full pt-2">
              {i18n._(t`I sent funds after rate expired. Are my funds lost?`)}
            </Typography>
            <Typography variant="base" className="w-full text-secondary">
              {i18n._(
                t`No, your funds can not get lost on Gashopper, as the middleware is in full control of the wallet. If a rate did not get fullfilled by the middleware, it can be initiated manually by the Varen DAO.`
              )}
            </Typography>
            <Typography variant="base" className="w-full text-secondary">
              {i18n._(
                t`Navigate to the Varen Discord server and provide your wallet address in the Discords #support channel.`
              )}
            </Typography>
          </div>
          <div className="flex flex-wrap w-full px-4 py-2 mt-4 border rounded bg-varen-darkest-blue border-varen-blue">
            <Typography weight={700} variant="lg" className="w-full pt-2">
              {i18n._(
                t`My accepted rate says 'Pending...' but there is no send button to be found. Do I have to start over?`
              )}
            </Typography>
            <Typography variant="base" className="w-full text-secondary">
              {i18n._(t`You could start over, or just send the funds of the selected source manually.`)}
            </Typography>
            <Typography variant="base" className="w-full text-secondary">
              {i18n._(t`The wallet address of the Gashopper funding wallet is: ${FAUCET_ADDRESS}`)}
            </Typography>
            <Typography variant="base" className="w-full text-secondary">
              {i18n._(
                t`Make sure, you send the exact amount of funds (listed in the accepted rate). The middleware will pick up your transaction and execute the exchange.`
              )}
            </Typography>
          </div>
          <div className="flex flex-wrap w-full px-4 py-2 mt-4 border rounded bg-varen-darkest-blue border-varen-blue">
            <Typography weight={700} variant="lg" className="w-full pt-2">
              {i18n._(t`Why is there a 'Varen DAO Treasury' element in my rate?`)}
            </Typography>
            <Typography variant="base" className="w-full text-secondary">
              {i18n._(
                t`Gashopper charges a 10% fee on every exchange. This fee goes into the Gashopper funding wallet and ultimately into Varen DAO Treasury as protocol owned liquidity.`
              )}
            </Typography>
          </div>
          <div className="flex flex-wrap w-full px-4 py-2 mt-4 border rounded bg-varen-darkest-blue border-varen-blue">
            <Typography weight={700} variant="lg" className="w-full pt-2">
              {i18n._(t`I can't agree on a rate, as the funding wallet balance is too low?`)}
            </Typography>
            <Typography variant="base" className="w-full text-secondary">
              {i18n._(
                t`Gashopper can only send funds from it's own wallet. If a wallet on a specific chain is empty or too low, the dApp prevents the exchange from happening.`
              )}
            </Typography>
            <Typography variant="base" className="w-full text-secondary">
              {i18n._(
                t`You can either wait for the balance to be replenished by other exchanges, or navigate to the Varen DAO Discord server and inform the DAO via the #support channel.`
              )}
            </Typography>
          </div>
          <div className="flex flex-wrap w-full px-4 py-2 mt-4 border rounded bg-varen-darkest-blue border-varen-blue">
            <Typography weight={700} variant="lg" className="w-full pt-2">
              {i18n._(t`Where can I check the balances of the Gashopper wallet?`)}
            </Typography>
            <Typography variant="base" className="w-full text-secondary">
              {i18n._(t`Gashopper uses the varen.eth ENS Domain.`)}
            </Typography>
            <Typography variant="base" className="text-secondary">
              {i18n._(t`You can check the Balances of it`)}
            </Typography>
            <ExternalLink href="https://zapper.fi/account/varen.eth" className="ml-2">
              {i18n._(t`here`)}
            </ExternalLink>
          </div>
          <div className="flex flex-wrap w-full px-4 py-2 mt-4 border rounded bg-varen-darkest-blue border-varen-blue">
            <Typography weight={700} variant="lg" className="w-full pt-2">
              {i18n._(t`I got an error using Gashopper. Where do I find help?`)}
            </Typography>
            <Typography variant="base" className="w-full text-secondary">
              {i18n._(
                t`Navigate to the Varen Discord server and provide your wallet address in the Discords #support channel.`
              )}
            </Typography>
          </div>
        </div>
      </section>
    </Container>
  )
}
