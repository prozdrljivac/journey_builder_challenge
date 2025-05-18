import { useEffect, useState } from 'react'
import { ActionBlueprintGraphApi } from './api'
import { NodeForm, NodeList, Sidebar } from './components'
import { ActionBlueprintGraphContext } from './context/ActionBlueprintGraphContext'
import type { ActionBlueprintGraph } from './types'

export default function App() {
  const [actionBlueprintGraph, setActionBlueprintGraph] =
    useState<ActionBlueprintGraph>()
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  useEffect(() => {
    ActionBlueprintGraphApi.getById('bp_123')
      .then(setActionBlueprintGraph)
      .catch(console.error)
  }, [])

  function handleOnItemClick(id: string) {
    setSelectedNode(id)
  }

  function handleSidebarClose() {
    setSelectedNode(null)
  }

  if (!actionBlueprintGraph) return <h1>Loading…</h1>

  return (
    <ActionBlueprintGraphContext.Provider value={actionBlueprintGraph}>
      <main>
        <NodeList onItemClick={handleOnItemClick} />
        <Sidebar
          isOpen={!!selectedNode}
          onClose={handleSidebarClose}
        >
          <NodeForm selectedNodeId={selectedNode} />
        </Sidebar>
      </main>
    </ActionBlueprintGraphContext.Provider>
  )
}
