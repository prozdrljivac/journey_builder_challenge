import { useEffect, useState } from 'react'
import { ActionBlueprintGraphApi } from './api'
import type { ActionBlueprintGraphDTO } from './api/action-blueprint-graph/dto'
import './App.css'

// API Endpoint - localhost:3000/api/v1/123/actions/blueprints/bp_456/graph
/* TODO - Hit action-blueprint-graph-get endpoint from a mock server and render a list of forms.

- Define a ActionBlueprintDTO
- Render a list of forms
  - Create a context and reducer
  - List and ListItem - with display name and onClick action
*/

function App() {
  const [graph, setGraph] = useState<ActionBlueprintGraphDTO>()

  useEffect(() => {
    ActionBlueprintGraphApi.getById('bp_123')
      .then((data) => {
        console.log(data)
        setGraph(data)
      })
      .catch(console.error)
  }, [])

  if (!graph) {
    return <h1>No Graph Buddy</h1>
  }
  return (
    <>
      {graph.nodes.map((node) => (
        <p>{node.data.name}</p>
      ))}
    </>
  )
}

export default App
