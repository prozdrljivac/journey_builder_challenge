import { useMemo, useState } from 'react'
import { useActionBlueprintGraphContext } from '../../context/ActionBlueprintGraphContext'
import { Modal } from '../Generics/Modal/Modal'
import './SelectMappingDialog.css'

type SelectValueDialogProps = {
  nodeId: string | null
  isOpen: boolean
  onSelect: (value: string) => void
  onClose: () => void
}

const ACTION_PROPERTIES = {
  id: 'action_props',
  name: 'Action Properties',
  properties: ['id', 'email', 'name', 'notes'],
}

export function SelectMappingDialog({
  nodeId,
  isOpen,
  onSelect,
  onClose,
}: SelectValueDialogProps) {
  const graph = useActionBlueprintGraphContext()
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const groups = useMemo(() => {
    if (!nodeId) {
      return []
    }

    const node = graph.nodes.find((n) => n.id === nodeId)
    if (!node) {
      return []
    }
    const queue = [...node.data.prerequisites]
    const visited = new Set<string>()
    const result: { id: string; name: string; properties: string[] }[] = [
      ACTION_PROPERTIES,
    ]

    while (queue.length) {
      const id = queue.shift()!
      if (visited.has(id)) {
        continue
      }
      visited.add(id)

      const node = graph.nodes.find((n) => n.id === id)
      if (!node) {
        continue
      }
      const form = graph.forms.find((f) => f.id === node.data.component_id)
      result.push({
        id: node.id,
        name: node.data.name,
        properties: form ? Object.keys(form.field_schema.properties) : [],
      })

      queue.push(...node.data.prerequisites)
    }
    return result
  }, [graph, nodeId])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <h2 className="svd-title">Select data element to map</h2>

      <div className="svd-panels">
        {/* LEFT – groups & nested properties */}
        <ul className="svd-sidebar">
          {groups.map((g) => {
            const isOpen = expanded.has(g.id)
            return (
              <li key={g.id}>
                <button
                  className={`svd-group ${isOpen ? 'open' : ''}`}
                  onClick={() => {
                    setExpanded((prev) => {
                      const next = new Set(prev)
                      if (isOpen) {
                        next.delete(g.id)
                      } else {
                        next.add(g.id)
                      }
                      return next
                    })
                  }}
                >
                  <span className="arrow">{isOpen ? '▾' : '▸'}</span>
                  {g.name}
                </button>

                {isOpen && (
                  <ul className="svd-proplist">
                    {g.properties.map((prop) => (
                      <li
                        key={prop}
                        className="svd-prop"
                        onClick={() => {
                          onSelect(`${g.name}.${prop}`)
                          onClose()
                        }}
                      >
                        {prop}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
        {/* RIGHT – Can be later used to display selected properties */}
        <div>{/* <p className="svd-title">Test</p> */}</div>
      </div>

      <button
        className="svd-cancel"
        onClick={onClose}
      >
        Cancel
      </button>
    </Modal>
  )
}
