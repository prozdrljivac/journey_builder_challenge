import { useActionBlueprintGraphContext } from '../../context/ActionBlueprintGraphContext'
import type { ActionBlueprintGraph } from '../../types'
import './NodeList.css'
import NodeListItem from './NodeListItem'

type Node = {
  id: string
  name: string
}

type NodeListProps = {
  onItemClick: (id: string) => void
}

function actionBlueprintGraphToNode(
  actionBlueprintGraph: ActionBlueprintGraph,
): Node[] {
  const mappedData = actionBlueprintGraph.nodes.map((node) => {
    return { id: node.id, name: node.data.name }
  })
  return mappedData
}

export function NodeList(props: NodeListProps) {
  const actionBlueprintGraph = useActionBlueprintGraphContext()
  const nodes = actionBlueprintGraphToNode(actionBlueprintGraph)

  function handleOnNodeListItemClick(id: string) {
    props.onItemClick(id)
  }

  if (!nodes) return <h1>No Nodes To Display</h1>

  return (
    <>
      <h1 className="title">Nodes</h1>
      {nodes.map(({ id, name }) => (
        <NodeListItem
          key={id}
          onClick={() => handleOnNodeListItemClick(id)}
        >
          {name}
        </NodeListItem>
      ))}
    </>
  )
}
