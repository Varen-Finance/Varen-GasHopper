import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { MenuItem, MenuItemLeaf, MenuItemNode } from 'app/components/Header/useMenu'
import Typography from 'app/components/Typography'
import { classNames } from 'app/functions'
import useDesktopMediaQuery from 'app/hooks/useDesktopMediaQuery'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, Fragment, useRef } from 'react'

interface NavigationItem {
  node: MenuItem
}

export const NavigationItem: FC<NavigationItem> = ({ node }) => {
  const router = useRouter()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isDesktop = useDesktopMediaQuery()

  if (node && node.hasOwnProperty('link')) {
    const { link } = node as MenuItemLeaf
    return (
      <Typography
        onClick={() => router.push(link)}
        weight={700}
        variant="sm"
        className={classNames(
          router.asPath === link ? 'text-white' : '',
          'hover:text-white font-bold  px-4 py-2 flex gap-3 items-center'
        )}
      >
        {node.title}
      </Typography>
    )
  }

  return (
    <Popover key={node.key} className="relative flex">
      <div className="flex items-center">
        <Popover.Button ref={buttonRef}>
          <Typography
            weight={700}
            variant="sm"
            className="flex items-center px-4 py-2 font-bold border border-transparent rounded bg-transparentshadow-sm text-primary hover:border-indigo-400 hover:cursor-pointer"
          >
            {!isDesktop && node.icon}
            <span className="pr-2">{node.title}</span>
            <ChevronDownIcon width={14} />
          </Typography>
        </Popover.Button>
        {node.hasOwnProperty('items') && (
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Popover.Panel className="z-10 w-full absolute w-40 translate-y-[-8px] translate-x-[-8px]">
              <div className="absolute left-0 w-full p-2 mt-8 origin-top-right divide-y rounded shadow-lg divide-dark-600 bg-varen-darkest-blue focus:outline-none">
                {(node as MenuItemNode).items.map((leaf) => (
                  <Link key={leaf.key} href={leaf.link}>
                    <a>
                      <Typography
                        variant="sm"
                        weight={700}
                        onClick={() => {
                          router.push(leaf.link).then(() => buttonRef?.current?.click())
                        }}
                        className="flex items-center p-2 text-sm font-bold rounded group hover:bg-varen-dark-blue focus:bg-varen-dark-blue'"
                      >
                        {leaf.title}
                      </Typography>
                    </a>
                  </Link>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        )}
      </div>
    </Popover>
  )
}
