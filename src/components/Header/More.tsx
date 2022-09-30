import { Popover, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import ExternalLink from '../ExternalLink'
import { I18n } from '@lingui/core'
import Image from 'next/image'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

const internalLinks = (i18n: I18n) => [
  {
    name: i18n._(t`About Varen`),
    image: <Image src="https://varenx.com/images/misc/varen.svg" alt="VarenX" width={18} height={18} />,
    href: 'https://varen.finance/',
    external: true,
  },
  //{
  //  name: i18n._(t`Support`),
  //  image: <Image src="https://varenx.com/images/misc/support.svg" alt="Support" width={18} height={18} />,
  //  href: '/support',
  //  external: true,
  //},
  {
    name: i18n._(t`Proposals`),
    image: <Image src="https://varenx.com/images/misc/proposal.svg" alt="Proposals" width={18} height={18} />,
    href: 'https://snapshot.org/#/varen.eth',
    external: true,
  },
  {
    name: i18n._(t`Governance Forum`),
    image: <Image src="https://varenx.com/images/misc/governance.svg" alt="Governance" width={18} height={18} />,
    href: 'https://forum.varen.finance/',
    external: false,
  },
  {
    name: i18n._(t`Documentation`),
    image: <Image src="https://varenx.com/images/misc/documentation.svg" alt="Documentation" width={18} height={18} />,
    href: 'https://gitbook.varen.finance/',
    external: true,
  },
]

const externalLinks = (i18n: I18n) => [
  {
    name: i18n._(t`Twitter`),
    image: <Image src="https://varenx.com/images/misc/twitter.svg" alt="Twitter" width={18} height={18} />,
    href: 'https://twitter.com/varenfinance',
    external: true,
  },
  {
    name: i18n._(t`Github`),
    image: <Image src="https://varenx.com/images/misc/github.svg" alt="Github" width={18} height={18} />,
    href: 'https://github.varen.finance/',
    external: true,
  },
  {
    name: i18n._(t`Medium`),
    image: <Image src="https://varenx.com/images/misc/medium.svg" alt="Medium" width={18} height={18} />,
    href: 'https://blog.varen.finance/',
    external: true,
  },
  {
    name: i18n._(t`Telegram`),
    image: <Image src="https://varenx.com/images/misc/telegram.svg" alt="Telegram" width={18} height={18} />,
    href: 'https://telegram.varen.finance/',
    external: true,
  },
]

export default function Menu() {
  const { i18n } = useLingui()
  const solutionsInternal = internalLinks(i18n)
  const solutionsExternal = externalLinks(i18n)

  return (
    <Popover className="flex items-center w-auto border rounded cursor-pointer pointer-events-auto select-none text-md border-varenx-blue hover:border-indigo-400 whitespace-nowrap">
      {({ open }) => (
        <>
          <Popover.Button>
            <div className="flex px-3 py-3">
              {!open ? (
                <Image src="https://varenx.com/images/misc/hamburger.svg" alt="Menu" width={20} height={16} />
              ) : (
                <Image src="https://varenx.com/images/misc/close.svg" alt="Close" width={20} height={16} />
              )}
            </div>
          </Popover.Button>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              static
              className="absolute z-50 w-full mt-3 transform -translate-x-full md:max-w-xs lg:top-12 left-full"
              style={{ bottom: '4rem' }}
            >
              <div className="overflow-hidden border rounded-sm shadow-lg ring-1 ring-black ring-opacity-5 border-varenx-blue hover:border-indigo-400">
                <div className="relative grid gap-6 px-6 py-6 bg-varenx-darker-blue sm:gap-8 sm:p-8">
                  {solutionsInternal.map((item) => (
                    <ExternalLink
                      key={item.name}
                      href={item.href}
                      className="px-3 py-1 -m-3 transition duration-150 ease-in-out rounded-md hover:bg-dark-800"
                    >
                      <div
                        className="flex space-x-6 text-base font-medium text-high-emphesis"
                        style={{ height: '18px' }}
                      >
                        {item.image}
                        <span className="ml-6">{item.name}</span>
                      </div>
                    </ExternalLink>
                  ))}
                </div>
                <div className="relative grid gap-6 px-6 py-6 border-t border-gray-700 min-w-max bg-varenx-darker-blue sm:gap-8 sm:p-8">
                  {solutionsExternal.map((item) => (
                    <ExternalLink
                      key={item.name}
                      href={item.href}
                      className="px-3 py-1 -m-3 transition duration-150 ease-in-out rounded-md hover:bg-dark-800"
                    >
                      <div
                        className="flex space-x-6 text-base font-medium text-high-emphesis"
                        style={{ height: '18px' }}
                      >
                        {item.image}
                        <span className="ml-6">{item.name}</span>
                      </div>
                    </ExternalLink>
                  ))}
                </div>
                <div className="relative grid gap-6 px-6 py-6 min-w-max bg-varenx-darker-blue sm:gap-6 sm:pb-8 sm:pt-5">
                  <ExternalLink
                    key="Discord"
                    href="https://discord.varen.finance/"
                    className="px-3 -m-2 transition duration-150 ease-in-out rounded-md"
                  >
                    <div className="flex space-x-4 text-base font-medium text-high-emphesis align-center">
                      <Image src="https://varenx.com/images/misc/discord.svg" alt="Discord" width={45} height={45} />
                      <ExternalLink className="text-xl text-varenx-gold" href="https://discord.varen.finance">
                        {i18n._(t`Contribute Now!`)}
                      </ExternalLink>
                    </div>
                  </ExternalLink>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
