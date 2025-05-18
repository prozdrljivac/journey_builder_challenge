import { createContext, useContext } from 'react'
import type { ActionBlueprintGraph } from '../types'

export const ActionBlueprintGraphContext = createContext<
  ActionBlueprintGraph | undefined
>(undefined)

export function useActionBlueprintGraphContext() {
  const actionBlueprintGraph = useContext(ActionBlueprintGraphContext)

  if (!actionBlueprintGraph) {
    throw new Error(
      'useActionBlueprintGraphContext must be used with ActionBlueprintGraphContext',
    )
  }

  return actionBlueprintGraph
}
