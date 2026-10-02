import type { ConnectionProbe, ResolvedCollection } from './externa'

export type HomePayload =
  | {
    kind: 'list'
    resolved: ResolvedCollection
    items: Array<{ id: number; label: string }>
    total: number
  }
  | {
    kind: 'setup'
    connection: ConnectionProbe
    availableSlugs: string[]
    requestedSlug: string | null
  }
  | {
    kind: 'error'
    message: string
  }

export type ItemPayload =
  | {
    kind: 'item'
    resolved: ResolvedCollection
    id: number
    label: string
    updatedAt: string
    fields: Array<{ key: string; value: string }>
  }
  | {
    kind: 'setup'
    connection: ConnectionProbe
    availableSlugs: string[]
    requestedSlug: string | null
  }
  | {
    kind: 'missing'
    id: string
    slug: string
  }
  | {
    kind: 'error'
    id: string
    message: string
  }
