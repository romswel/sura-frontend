import { useLayoutEffect, useRef } from 'react'
import type { ReactNode } from 'react'

export default function Modal({
  titleId,
  onClose,
  children,
}: {
  titleId: string
  onClose: () => void
  children: ReactNode
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  useLayoutEffect(() => {
    const element = dialog.current
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
    element?.showModal()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      element?.close()
      document.body.style.overflow = previous
      if (opener?.isConnected) opener.focus({ preventScroll: true })
    }
  }, [])
  return (
    <dialog
      className="preview-dialog"
      ref={dialog}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="dialog-inner">
        <button className="close-button" onClick={onClose} aria-label="Close preview" autoFocus>
          ×
        </button>
        {children}
      </div>
    </dialog>
  )
}
