import { type MouseEventHandler, type ReactNode } from 'react'
import './NodeList.css'

type NodeListItemProps = {
  onClick?: MouseEventHandler<HTMLLIElement>
  children: ReactNode
}

export function NodeListItem(props: NodeListItemProps) {
  return (
    <li
      data-testid="node-list-item"
      className="list-item"
      onClick={props.onClick}
    >
      {props.children}
    </li>
  )
}
