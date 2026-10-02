<script setup lang="ts">
import type { ConnectionProbe } from '~/shared/types/externa'

const props = withDefaults(
  defineProps<{
    title?: string
    requestedSlug?: string | null
    availableSlugs?: string[]
    connection: ConnectionProbe
  }>(),
  {
    title: 'Connect a collection',
    requestedSlug: null,
    availableSlugs: () => [],
  },
)
</script>

<template>
  <h1>{{ props.title }}</h1>
  <p class="lede">
    Fresh Externa installs ship with no collections. Point this starter at one
    you create, or grant <strong>Read</strong> so auto-discovery can pick the
    first readable collection.
  </p>
  <div class="setup">
    <ol>
      <li>
        In Externa admin, create a collection (any slug) and add at least one
        item if you want something to list.
      </li>
      <li>
        Grant <strong>Read</strong> on that collection for the
        <code>public</code> role, or set <code>EXTERNA_API_KEY</code> to a key
        whose role has Read.
      </li>
      <li>
        Optionally set <code>EXTERNA_COLLECTION</code> to that slug in
        <code>.env</code>. Leave it empty to auto-pick the first readable
        collection via <code>GET /api/v1/collections</code>.
      </li>
    </ol>
    <p v-if="props.requestedSlug">
      Requested slug <code>{{ props.requestedSlug }}</code> was not found (or not
      readable). Check the slug and Collection access.
    </p>
    <p v-if="props.availableSlugs.length > 0">
      Readable collections right now:
      <template
        v-for="(slug, i) in props.availableSlugs"
        :key="slug"
      >
        <span v-if="i > 0">, </span><code>{{ slug }}</code>
      </template>
      . Set one as <code>EXTERNA_COLLECTION</code> or leave empty to use the first.
    </p>
    <p v-else>
      No readable collections returned by the Public API yet
      (<code>data: []</code>).
    </p>
    <p :class="props.connection.ok ? 'setup-ok' : 'setup-bad'">
      <template v-if="props.connection.ok">
        API reachable — OpenAPI
        <code v-if="props.connection.openapi">{{ props.connection.openapi }}</code>
        <template v-else>ok</template>
        <template v-if="props.connection.title">
          (<code>{{ props.connection.title }}</code>)
        </template>
        .
      </template>
      <template v-else>
        Could not reach <code>/api/v1/openapi.json</code>:
        {{ props.connection.message }}. Check <code>EXTERNA_API_URL</code>.
      </template>
    </p>
  </div>
</template>
