import { type ReactNode } from 'react'
import './Sidebar.css'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function Sidebar({ isOpen, onClose, children }: SidebarProps) {
  return (
    <>
      <div
        className={`sidebar-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>{children}</aside>
    </>
  )
}
