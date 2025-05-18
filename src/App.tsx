import { useEffect, useState } from 'react'
import { ActionBlueprintGraphApi } from './api'
import { NodeList } from './components'
import { ActionBlueprintGraphContext } from './context/ActionBlueprintGraphContext'
import type { ActionBlueprintGraph } from './types'

export default function App() {
  const [actionBlueprintGraph, setActionBlueprintGraph] =
    useState<ActionBlueprintGraph>()

  useEffect(() => {
    ActionBlueprintGraphApi.getById('bp_123')
      .then(setActionBlueprintGraph)
      .catch(console.error)
  }, [])

  if (!actionBlueprintGraph) return <h1>Loading…</h1>

  return (
    <ActionBlueprintGraphContext.Provider value={actionBlueprintGraph}>
      <main>
        <NodeList />
      </main>
    </ActionBlueprintGraphContext.Provider>
  )
}
