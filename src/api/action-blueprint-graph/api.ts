import { apiV1Client } from '../api'
import type { ActionBlueprintGraphDTO } from './dto'

const TENANT_ID = 123

async function getActionBlueprintGraph(id: string) {
  const response = await apiV1Client.get<ActionBlueprintGraphDTO>(
    `/${TENANT_ID}/actions/blueprints/${id}/graph`,
  )
  const data = await response.data
  return data
}

export const ActionBlueprintGraphApi = {
  getById: getActionBlueprintGraph,
}
