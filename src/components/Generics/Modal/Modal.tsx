import { type MouseEvent, type ReactNode, useRef } from 'react'
import { createPortal } from 'react-dom'
import './Modal.css'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function Modal(props: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  if (!props.isOpen) {
    return null
  }

  return createPortal(
    <div
      className="modal-backdrop"
      onClick={props.onClose}
    >
      <div
        className="modal-dialog"
        ref={modalRef}
        onClick={(e: MouseEvent) => e.stopPropagation()}
      >
        {props.children}
      </div>
    </div>,
    document.body,
  )
}
