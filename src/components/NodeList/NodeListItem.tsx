import { type MouseEventHandler, type ReactNode } from 'react'
import './NodeList.css'

type ListItemProps = {
  onClick?: MouseEventHandler<HTMLLIElement>
  children: ReactNode
}

export default function ListItem(props: ListItemProps) {
  return (
    <li
      className="list-item"
      onClick={props.onClick}
    >
      {props.children}
    </li>
  )
}
