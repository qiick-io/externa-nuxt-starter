<script setup lang="ts">
import type { HomePayload } from '~/shared/types/payloads'

const { data, error } = await useFetch<HomePayload>('/api/home', {
  key: 'home',
})
</script>

<template>
  <div>
    <div
      v-if="error"
      class="error"
    >
      <p>{{ error.message }}</p>
    </div>
    <template v-else-if="data?.kind === 'list'">
      <h1>{{ data.resolved.name ?? data.resolved.slug }}</h1>
      <p class="lede">
        {{ data.total }} item{{ data.total === 1 ? '' : 's' }} from Externa Public CMS
        API
        <template v-if="data.resolved.source === 'discovered'">
          · auto-discovered <code>{{ data.resolved.slug }}</code>
        </template>
        <template v-else>
          · <code>{{ data.resolved.slug }}</code>
        </template>
        .
      </p>
      <p
        v-if="data.items.length === 0"
        class="lede"
      >
        Collection is readable but empty. Create items in Externa admin.
      </p>
      <ul
        v-else
        class="item-list"
      >
        <li
          v-for="item in data.items"
          :key="item.id"
        >
          <NuxtLink :to="`/items/${item.id}`">
            {{ item.label }}
            <span class="meta">#{{ item.id }}</span>
          </NuxtLink>
        </li>
      </ul>
    </template>
    <SetupPanel
      v-else-if="data?.kind === 'setup'"
      :connection="data.connection"
      :available-slugs="data.availableSlugs"
      :requested-slug="data.requestedSlug"
    />
    <div
      v-else-if="data?.kind === 'error'"
      class="error"
    >
      <p>{{ data.message }}</p>
    </div>
  </div>
</template>
