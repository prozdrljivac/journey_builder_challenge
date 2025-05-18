import { useMemo } from 'react'
import { useActionBlueprintGraphContext } from '../../context/ActionBlueprintGraphContext'
import './NodeForm.css'

type NodeFormProps = {
  selectedNodeId: string | null
}

export function NodeForm(props: NodeFormProps) {
  const actionBlueprintGraph = useActionBlueprintGraphContext()

  const formFields = useMemo(() => {
    if (!props.selectedNodeId) {
      return []
    }

    const node = actionBlueprintGraph.nodes.find(
      (n) => n.id === props.selectedNodeId,
    )
    if (!node) {
      return []
    }

    const form = actionBlueprintGraph.forms.find(
      (f) => f.id === node.data.component_id,
    )
    if (!form) {
      return []
    }

    return Object.keys(form.field_schema.properties)
  }, [props.selectedNodeId, actionBlueprintGraph])

  if (!props.selectedNodeId) {
    return <p className="empty-msg">Select a node to configure pre-fill.</p>
  }

  return (
    <div className="node-form">
      <h1 className="title">Prefill</h1>
      <p className="subline">Prefill fields for this form</p>

      {formFields.map((fieldId) => (
        <p style={{ color: 'black' }}>{fieldId}</p>
      ))}
    </div>
  )
}
