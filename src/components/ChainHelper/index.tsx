import React, { FC, useCallback, useState } from 'react'
import Tooltip from '../Tooltip'

const ChainHelper: FC<{ text?: any; children: React.ReactNode }> = ({ children, text }) => {
  const [show, setShow] = useState<boolean>(false)

  const open = useCallback(() => setShow(true), [setShow])
  const close = useCallback(() => setShow(false), [setShow])

  return (
    <Tooltip placement="bottom" text={text} show={show}>
      <div
        className="flex items-center justify-center outline-none"
        onClick={close}
        onMouseEnter={open}
        onMouseLeave={close}
      >
        {children}
      </div>
    </Tooltip>
  )
}

export default ChainHelper
