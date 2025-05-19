import { useState } from 'react'
import { SelectMappingDialog } from '../SelectMappingDialog/SelectMappingDialog'
import './NodeFormField.css'

export type NodeFormFieldProps = {
  fieldId: string
  nodeId: string | null
  label?: string
  mappedValue?: string
  onChange: (value: string | undefined) => void
}

export default function NodeFormField(props: NodeFormFieldProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      {props.mappedValue ? (
        <div className="chip mapped">
          <span className="chip-text">
            {props.label}: {props.mappedValue}
          </span>
          <button
            className="chip-remove"
            onClick={() => props.onChange(undefined)}
          >
            ×
          </button>
        </div>
      ) : (
        <button
          className="chip placeholder"
          onClick={() => setDialogOpen(true)}
        >
          {props.label}
        </button>
      )}

      <SelectMappingDialog
        isOpen={dialogOpen}
        nodeId={props.nodeId}
        onSelect={(v) => {
          props.onChange(v)
          setDialogOpen(false)
        }}
        onClose={() => setDialogOpen(false)}
      />
    </>
  )
}
