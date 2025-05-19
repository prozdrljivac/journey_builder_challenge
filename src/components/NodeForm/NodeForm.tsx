import { useMemo, useState } from 'react'
import { useActionBlueprintGraphContext } from '../../context/ActionBlueprintGraphContext'
import './NodeForm.css'
import NodeFormField from './NodeFormField'

type NodeFormProps = { selectedNodeId: string | null }
type NodeMapping = Record<string, Record<string, string | undefined>>

export function NodeForm({ selectedNodeId }: NodeFormProps) {
  const actionBlueprintGraph = useActionBlueprintGraphContext()

  const fieldIds = useMemo(() => {
    if (!selectedNodeId) {
      return []
    }

    const node = actionBlueprintGraph.nodes.find((n) => n.id === selectedNodeId)
    if (!node) {
      return []
    }

    const form = actionBlueprintGraph.forms.find(
      (f) => f.id === node.data.component_id,
    )
    return form ? Object.keys(form.field_schema.properties) : []
  }, [selectedNodeId, actionBlueprintGraph])

  const [mappingByNode, setMappingByNode] = useState<NodeMapping>({})

  const currentMapping = mappingByNode[selectedNodeId ?? ''] ?? {}

  function updateMapping(fieldId: string, value?: string) {
    if (!selectedNodeId) {
      return
    }

    setMappingByNode((prev) => ({
      ...prev,
      [selectedNodeId]: {
        ...prev[selectedNodeId],
        [fieldId]: value,
      },
    }))
  }

  if (!selectedNodeId) {
    return <p className="empty-msg">Select a node to configure pre-fill.</p>
  }

  return (
    <div className="node-form">
      <h1 className="title">Prefill</h1>
      <p className="subline">Prefill fields for this form</p>

      {fieldIds.map((fieldId) => (
        <NodeFormField
          key={fieldId}
          fieldId={fieldId}
          nodeId={selectedNodeId}
          label={fieldId}
          mappedValue={currentMapping[fieldId]}
          onChange={(val) => updateMapping(fieldId, val)}
        />
      ))}
    </div>
  )
}
