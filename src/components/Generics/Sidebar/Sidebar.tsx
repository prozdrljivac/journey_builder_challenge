import { type ReactNode } from 'react'
import './Sidebar.css'

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function Sidebar(props: SidebarProps) {
  return (
    <>
      <div
        className={`sidebar-backdrop ${props.isOpen ? 'open' : ''}`}
        onClick={props.onClose}
      />

      <aside className={`sidebar ${props.isOpen ? 'open' : ''}`}>
        {props.children}
      </aside>
    </>
  )
}
