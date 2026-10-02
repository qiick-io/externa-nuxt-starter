import type { H3Event } from 'h3'
import type {
  CollectionItem,
  CollectionSummary,
  ResolvedCollection,
} from '../../../shared/types/externa'
import { ExternaHttpError, externaConfig, externaFetch } from './client'

type ListResponse = {
  data: CollectionItem[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

type ItemResponse = {
  data: CollectionItem
}

type CollectionsResponse = {
  data: CollectionSummary[]
}

/**
 * Explicit slug from env, or `null` when unset (auto-discover).
 */
export function configuredCollectionSlug(event: H3Event): string | null {
  const slug = externaConfig(event).externaCollection?.trim()
  return slug ? slug : null
}

/**
 * List collections readable by the current actor (`public` or API key role).
 */
export async function listCollections(event: H3Event): Promise<CollectionSummary[]> {
  const json = await externaFetch<CollectionsResponse>(event, '/api/v1/collections')
  return json.data
}

/**
 * `true` when slug exists and actor may read it.
 */
export async function collectionReadable(event: H3Event, slug: string): Promise<boolean> {
  try {
    await externaFetch<{ data: CollectionSummary }>(
      event,
      `/api/v1/collections/${encodeURIComponent(slug)}`,
    )
    return true
  }
  catch (error) {
    if (error instanceof ExternaHttpError && (error.status === 404 || error.status === 403)) {
      return false
    }
    throw error
  }
}

/**
 * Use `EXTERNA_COLLECTION` when set; otherwise first readable collection.
 */
export async function resolveCollection(event: H3Event): Promise<ResolvedCollection | null> {
  const configured = configuredCollectionSlug(event)
  if (configured) {
    return { slug: configured, source: 'env' }
  }

  const collections = await listCollections(event)
  const first = collections[0]
  if (!first) {
    return null
  }

  return {
    slug: first.slug,
    source: 'discovered',
    name: first.name,
  }
}

/**
 * Paginated items for a collection.
 */
export async function listItems(
  event: H3Event,
  slug: string,
  page = 1,
  perPage = 15,
): Promise<ListResponse> {
  const qs = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  })
  return externaFetch<ListResponse>(
    event,
    `/api/v1/collections/${encodeURIComponent(slug)}/items?${qs}`,
  )
}

/**
 * Fetch a single item by id within a collection.
 */
export async function getItem(
  event: H3Event,
  slug: string,
  id: string | number,
): Promise<CollectionItem> {
  const json = await externaFetch<ItemResponse>(
    event,
    `/api/v1/collections/${encodeURIComponent(slug)}/items/${encodeURIComponent(String(id))}`,
  )
  return json.data
}

/**
 * Best-effort title from common field names; falls back to id.
 */
export function itemLabel(item: CollectionItem): string {
  const data = item.data ?? {}
  for (const key of ['title', 'name', 'slug', 'label'] as const) {
    const value = data[key]
    if (typeof value === 'string' && value.trim() !== '') {
      return value
    }
  }
  return `Item #${item.id}`
}

/**
 * Detect a 404 from the Public CMS API (missing collection or item).
 */
export function isMissingCollectionError(error: unknown): boolean {
  return error instanceof ExternaHttpError && error.status === 404
}
