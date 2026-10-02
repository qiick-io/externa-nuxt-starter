import type { ItemPayload } from '../../../shared/types/payloads'
import {
  collectionReadable,
  configuredCollectionSlug,
  getItem,
  isMissingCollectionError,
  itemLabel,
  listCollections,
  resolveCollection,
} from '../../utils/externa/collections'
import { pingOpenApi } from '../../utils/externa/openapi'

async function loadAvailableSlugs(event: Parameters<typeof listCollections>[0]): Promise<string[]> {
  try {
    return (await listCollections(event)).map(c => c.slug)
  }
  catch {
    return []
  }
}

/**
 * Server-only item detail payload.
 */
export default defineEventHandler(async (event): Promise<ItemPayload> => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    return { kind: 'error', id: '', message: 'Missing item id' }
  }

  let activeSlug: string | null = null

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

    activeSlug = resolved.slug
    const item = await getItem(event, resolved.slug, id)
    const entries = Object.entries(item.data ?? {})

    return {
      kind: 'item',
      resolved,
      id: item.id,
      label: itemLabel(item),
      updatedAt: item.updated_at,
      fields: entries.map(([key, value]) => ({
        key,
        value:
          typeof value === 'string' || typeof value === 'number'
            ? String(value)
            : JSON.stringify(value, null, 2),
      })),
    }
  }
  catch (error) {
    if (isMissingCollectionError(error) && activeSlug) {
      const readable = await collectionReadable(event, activeSlug).catch(() => false)
      if (readable) {
        return { kind: 'missing', id, slug: activeSlug }
      }
    }

    if (isMissingCollectionError(error)) {
      return {
        kind: 'setup',
        connection: await pingOpenApi(event),
        availableSlugs: await loadAvailableSlugs(event),
        requestedSlug: configuredCollectionSlug(event) ?? activeSlug,
      }
    }

    return {
      kind: 'error',
      id,
      message: error instanceof Error ? error.message : String(error),
    }
  }
})
