import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { isMobile } from 'react-device-detect'

interface ModalProps {
  isOpen: boolean
  onDismiss?: () => void
  minHeight?: number
  maxHeight?: number
  initialFocusRef?: React.RefObject<any>
  children?: React.ReactNode
  padding?: number
  maxWidth?: number
  className?: string
}

export default function Modal({
  isOpen,
  onDismiss = () => {},
  minHeight = 0,
  maxHeight = 90,
  children,
  maxWidth = 520,
}: ModalProps) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={onDismiss} className="fixed inset-0 z-50 overflow-y-hidden backdrop-blur-md">
          <Dialog.Overlay className="fixed inset-0 bg-black backdrop-blur-md opacity-30" />
          <div className="flex items-center justify-center h-screen px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className="w-full transition-all transform"
                style={{
                  maxWidth: `${maxWidth}px`,
                }}
              >
                <div className="w-full p-px rounded-md bg-varenx-blue">
                  <div className="flex flex-col w-full h-full px-6 pt-6 pb-12 overflow-y-auto rounded-md bg-varenx-darkest-blue">
                    <div style={{ minHeight: `${minHeight}vh`, maxHeight: `${maxHeight}vh` }}>{children}</div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
