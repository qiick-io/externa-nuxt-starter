import type { HomePayload } from '../../shared/types/payloads'
import {
  configuredCollectionSlug,
  itemLabel,
  listCollections,
  listItems,
  resolveCollection,
} from '../utils/externa/collections'
import { ExternaHttpError } from '../utils/externa/client'
import { pingOpenApi } from '../utils/externa/openapi'

async function loadAvailableSlugs(event: Parameters<typeof listCollections>[0]): Promise<string[]> {
  try {
    return (await listCollections(event)).map(c => c.slug)
  }
  catch {
    return []
  }
}

/**
 * Server-only home payload: list items or setup / error UI data.
 * API key stays on the server.
 */
export default defineEventHandler(async (event): Promise<HomePayload> => {
  try {
    const resolved = await resolveCollection(event)

    if (!resolved) {
      return {
        kind: 'setup',
        connection: await pingOpenApi(event),
        availableSlugs: await loadAvailableSlugs(event),
        requestedSlug: configuredCollectionSlug(event),
      }
    }

    const { data, meta } = await listItems(event, resolved.slug)
    return {
      kind: 'list',
      resolved,
      items: data.map(item => ({ id: item.id, label: itemLabel(item) })),
      total: meta.total,
    }
  }
  catch (error) {
    if (error instanceof ExternaHttpError && error.status === 404) {
      return {
        kind: 'setup',
        connection: await pingOpenApi(event),
        availableSlugs: await loadAvailableSlugs(event),
        requestedSlug: configuredCollectionSlug(event),
      }
    }
    return {
      kind: 'error',
      message: error instanceof Error ? error.message : String(error),
    }
  }
})
