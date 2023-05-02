import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ReactNode } from 'react'

export interface MenuItemLeaf {
  key: string
  title: string
  link: string
  icon?: ReactNode
}

export interface MenuItemNode {
  key: string
  title: string
  items: MenuItemLeaf[]
  icon?: ReactNode
}

export type MenuItem = MenuItemLeaf | MenuItemNode
export type Menu = MenuItem[]

type UseMenu = () => Menu
const useMenu: UseMenu = () => {
  const { i18n } = useLingui()

  const menu: Menu = []
  menu.push({
    key: 'fund',
    title: i18n._(t`Fund your Wallet`),
    link: '/fund',
  })
  menu.push({
    key: 'stats',
    title: i18n._(t`Statistics`),
    link: '/stats',
  })

  menu.push({
    key: 'help',
    title: i18n._(t`Need Help?`),
    items: [
      {
        key: 'faq',
        title: i18n._(t`FAQ`),
        link: '/faq',
      },
      {
        key: 'discord',
        title: i18n._(t`Varen Discord`),
        link: 'https://discord.varen.finance',
      },
    ],
  })

  return menu
}

export default useMenu
