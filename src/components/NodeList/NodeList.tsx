import { useActionBlueprintGraphContext } from '../../context/ActionBlueprintGraphContext'
import type { ActionBlueprintGraph } from '../../types'
import './NodeList.css'
import NodeListItem from './NodeListItem'

type Node = {
  id: string
  name: string
}

function actionBlueprintGraphToNode(
  actionBlueprintGraph: ActionBlueprintGraph,
): Node[] {
  const mappedData = actionBlueprintGraph.nodes.map((node) => {
    return { id: node.id, name: node.data.name }
  })
  return mappedData
}

export function NodeList() {
  const actionBlueprintGraph = useActionBlueprintGraphContext()
  const nodes = actionBlueprintGraphToNode(actionBlueprintGraph)

  if (!nodes) return <h1>No Nodes To Display</h1>

  return (
    <>
      <h1 className="title">Nodes</h1>
      {nodes.map(({ id, name }) => (
        <NodeListItem
          key={id}
          onClick={() => console.log('Clicked', id)}
        >
          {name}
        </NodeListItem>
      ))}
    </>
  )
}
