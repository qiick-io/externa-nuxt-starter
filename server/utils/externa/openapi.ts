import type { H3Event } from 'h3'
import type { ConnectionProbe } from '../../../shared/types/externa'
import { baseUrl } from './client'

/**
 * Always-public OpenAPI document — proves API reachability without a collection.
 * No API key required on the core route.
 */
export async function pingOpenApi(event: H3Event): Promise<ConnectionProbe> {
  try {
    const res = await fetch(`${baseUrl(event)}/api/v1/openapi.json`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    })
    if (!res.ok) {
      return { ok: false, message: `OpenAPI HTTP ${res.status}` }
    }
    const json = (await res.json()) as {
      openapi?: unknown
      info?: { title?: unknown }
    }
    return {
      ok: true,
      openapi: typeof json.openapi === 'string' ? json.openapi : null,
      title: typeof json.info?.title === 'string' ? json.info.title : null,
    }
  }
  catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : String(error),
    }
  }
}
