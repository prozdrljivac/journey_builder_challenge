export interface ActionBlueprintGraphDTO {
  $schema: string
  id: string
  tenant_id: string
  name: string
  description: string
  category: string
  nodes: ActionBlueprintNodeDTO[]
  edges: ActionBlueprintEdgeDTO[]
  forms: ActionBlueprintFormDTO[]
  branches: ActionBlueprintBranchDTO[]
  triggers: ActionBlueprintTriggerDTO[]
}

export interface PositionDTO {
  x: number
  y: number
}

export interface ActionBlueprintNodeDTO {
  id: string
  type: 'form'
  position: PositionDTO
  data: ActionBlueprintNodeDataDTO
}

export interface ActionBlueprintNodeDataDTO {
  id: string
  component_key: string
  component_type: string
  component_id: string
  name: string
  prerequisites: string[]
  permitted_roles: string[]
  input_mapping: Record<string, unknown>
  sla_duration: {
    number: number
    unit: 'seconds' | 'minutes' | 'hours' | 'days' | string
  }
  approval_required: boolean
  approval_roles: string[]
}

export interface ActionBlueprintEdgeDTO {
  source: string
  target: string
}

export interface JsonSchemaProperty {
  avantos_type: string
  title?: string
  type: string
  format?: string
  enum?: unknown[]
  items?: { type: string; enum?: unknown[] }
  uniqueItems?: boolean
}

export interface JsonSchemaDTO {
  type: 'object'
  properties: Record<string, JsonSchemaProperty>
  required?: string[]
}

export interface UiSchemaElementDTO {
  type: string
  scope: string
  label?: string
  options?: Record<string, unknown>
}

export interface UiSchemaDTO {
  type: string
  elements: UiSchemaElementDTO[]
}

export interface DynamicFieldPayloadEntry {
  type: 'form_field' | string
  value: string
}

export interface DynamicFieldConfigEntry {
  selector_field: string
  payload_fields: Record<string, DynamicFieldPayloadEntry>
  endpoint_id: string
}

export interface ActionBlueprintFormDTO {
  id: string
  name: string
  description: string
  is_reusable: boolean
  field_schema: JsonSchemaDTO
  ui_schema: UiSchemaDTO
  dynamic_field_config: Record<string, DynamicFieldConfigEntry>
}

export type ActionBlueprintBranchDTO = unknown
export type ActionBlueprintTriggerDTO = unknown
