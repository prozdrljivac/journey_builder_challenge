import { type MouseEventHandler, type ReactNode } from 'react'
import './NodeList.css'

export interface ListItemProps {
  onClick?: MouseEventHandler<HTMLLIElement>
  children: ReactNode
}

export default function ListItem({ onClick, children }: ListItemProps) {
  return (
    <li
      className="list-item"
      onClick={onClick}
    >
      {children}
    </li>
  )
}
