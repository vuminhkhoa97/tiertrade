'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ReactNode } from 'react'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showCloseButton?: boolean
  backdrop?: boolean
  icon?: ReactNode
  iconBgColor?: string
  iconTextColor?: string
  actions?: ReactNode
  className?: string
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  backdrop = true,
  icon,  iconBgColor = 'bg-red-100 dark:bg-red-900/20',
  iconTextColor = 'text-red-600 dark:text-red-400',
  actions,
  className = '',
}: ModalProps) {
  const sizeClasses = {
    sm: 'sm:max-w-md',
    md: 'sm:max-w-lg',
    lg: 'sm:max-w-2xl',
    xl: 'sm:max-w-4xl',
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">      {backdrop && (
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 dark:bg-gray-900/80 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />
      )}

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">          <DialogPanel
            transition
            className={`relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full ${sizeClasses[size]} data-closed:sm:translate-y-0 data-closed:sm:scale-95 ${className}`}
          >            {/* Header */}
            <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                {/* Icon */}
                {icon && (
                  <div className={`mx-auto flex size-12 shrink-0 items-center justify-center rounded-full ${iconBgColor} sm:mx-0 sm:size-10`}>
                    <div className={`size-6 ${iconTextColor}`}>
                      {icon}
                    </div>
                  </div>
                )}
                
                {/* Content */}
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                  {/* Title and Close Button Container */}                  <div className="flex items-center justify-between">
                    {title && (
                      <DialogTitle as="h3" className="text-base font-semibold text-gray-900 dark:text-white">
                        {title}
                      </DialogTitle>
                    )}
                    
                    {showCloseButton && (
                      <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="size-6" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                  
                  {/* Main Content */}
                  <div className="mt-2">
                    {children}
                  </div>
                </div>
              </div>
            </div>
              {/* Actions */}
            {actions && (
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                {actions}
              </div>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

// Convenience component for confirmation modals
export interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  confirmButtonClass?: string
  isDestructive?: boolean
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmButtonClass,
  isDestructive = false,
}: ConfirmationModalProps) {  const defaultConfirmClass = isDestructive
    ? 'inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 dark:bg-red-600 dark:hover:bg-red-500 sm:ml-3 sm:w-auto'
    : 'inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 dark:bg-indigo-600 dark:hover:bg-indigo-500 sm:ml-3 sm:w-auto'

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}      icon={<ExclamationTriangleIcon aria-hidden="true" />}
      iconBgColor={isDestructive ? 'bg-red-100 dark:bg-red-900/20' : 'bg-yellow-100 dark:bg-yellow-900/20'}
      iconTextColor={isDestructive ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'}
      showCloseButton={false}
      actions={
        <>
          <button
            type="button"
            onClick={onConfirm}
            className={confirmButtonClass || defaultConfirmClass}
          >
            {confirmText}
          </button>          <button
            type="button"
            onClick={onClose}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-600 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-xs ring-1 ring-gray-300 dark:ring-gray-500 ring-inset hover:bg-gray-50 dark:hover:bg-gray-500 sm:mt-0 sm:w-auto"
          >
            {cancelText}
          </button>
        </>
      }    >
      <p className="text-sm text-gray-500 dark:text-gray-300">{message}</p>
    </Modal>
  )
}

export default Modal