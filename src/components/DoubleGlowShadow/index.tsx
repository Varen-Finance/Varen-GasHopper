import { FC } from 'react'
import { isMobile } from 'react-device-detect'
import { classNames } from '../../functions'

const DoubleGlowShadow: FC<{ className?: string; children: React.ReactNode }> = ({ children, className }) => {
  if (isMobile) {
    return <div className="shadow-swap">{children}</div>
  }

  return (
    <div className={classNames(className, 'relative w-full')}>
      <div className="absolute top-1/4 -left-10 bottom-4 w-3/5 rounded-full z-0 filter blur-[150px]" />
      <div className="absolute bottom-1/4 -right-10 top-4 w-3/5 rounded-full z-0  filter blur-[150px]" />
      <div className="relative filter drop-shadow">{children}</div>
    </div>
  )
}

export default DoubleGlowShadow
