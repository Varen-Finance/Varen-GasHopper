import { ChevronDownIcon } from '@heroicons/react/solid'
import cookieCutter from 'cookie-cutter'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { classNames } from '../../functions'

const LANG_TO_COUNTRY = {
  en: 'English',
  //  el: 'Ελληνικά',
  //  cs: 'český',
  //  da: 'Dansk',
  //  de: 'Deutsch',
  //  es: 'Español',
  fil: 'Filipino',
  fr: 'Français',
  hi: 'हिन्दी',
  it: 'Italiano',
  ja: '日本語',
  //  ko: '한국어',
  nl: 'Nederlands',
  pl: 'Polski',
  pt: 'Português',
  //  ro: 'Română',
  th: 'ไทย',
  tr: 'Türkçe',
  vi: 'Tiếng Việt',
  zh_CN: '中文',
}

const LangSwitcher = () => {
  const { locale, locales, asPath, push } = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <div className="relative inline-block text-right">
      <div
        className="inline-flex justify-center w-full px-4 py-2 text-sm font-bold border border-transparent rounded bg-transparentshadow-sm text-primary hover:border-indigo-400 hover:cursor-pointer"
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        {locale && LANG_TO_COUNTRY[locale]}
        <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
      </div>
      <div
        className={classNames(
          'absolute right-0 w-[max-content] mt-2 origin-top-right divide-y divide-dark-600 rounded shadow-lg bg-varen-darkest-blue focus:outline-none',
          isOpen ? 'block' : 'hidden'
        )}
      >
        <div className="p-2">
          {locales.map((l) => {
            return (
              <div key={l}>
                <Link href={asPath} locale={l}>
                  <span
                    className={
                      'group flex items-center p-2 text-sm hover:bg-varen-dark-blue focus:bg-varen-dark-blue rounded font-bold'
                    }
                    onClick={() => {
                      cookieCutter.set('NEXT_LOCALE', l)
                      push(asPath, undefined, { locale: l })
                      setIsOpen(false)
                    }}
                  >
                    <span className="ml-2">{LANG_TO_COUNTRY[l]}</span>
                  </span>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default LangSwitcher
