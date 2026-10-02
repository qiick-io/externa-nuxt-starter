<script setup lang="ts">
import type { ItemPayload } from '~/shared/types/payloads'

const route = useRoute()
const id = computed(() => String(route.params.id))

const { data, error } = await useFetch<ItemPayload>(() => `/api/items/${id.value}`, {
  key: () => `item-${id.value}`,
})
</script>

<template>
  <div>
    <NuxtLink
      class="back"
      to="/"
    >
      ← All items
    </NuxtLink>

    <div
      v-if="error"
      class="error"
    >
      <p>{{ error.message }}</p>
    </div>

    <template v-else-if="data?.kind === 'item'">
      <h1>{{ data.label }}</h1>
      <p class="lede">
        Item #{{ data.id }} · <code>{{ data.resolved.slug }}</code> · updated
        {{ new Date(data.updatedAt).toLocaleString() }}
      </p>
      <dl class="fields">
        <div
          v-if="data.fields.length === 0"
          class="field"
        >
          <dt>data</dt>
          <dd>(empty)</dd>
        </div>
        <div
          v-for="field in data.fields"
          v-else
          :key="field.key"
          class="field"
        >
          <dt>{{ field.key }}</dt>
          <dd>{{ field.value }}</dd>
        </div>
      </dl>
    </template>

    <SetupPanel
      v-else-if="data?.kind === 'setup'"
      :connection="data.connection"
      :available-slugs="data.availableSlugs"
      :requested-slug="data.requestedSlug"
    />

    <template v-else-if="data?.kind === 'missing'">
      <h1>Item #{{ data.id }}</h1>
      <p class="lede">
        No item with this id in <code>{{ data.slug }}</code>.
      </p>
    </template>

    <template v-else-if="data?.kind === 'error'">
      <h1>Item #{{ data.id }}</h1>
      <div class="error">
        <p>{{ data.message }}</p>
      </div>
    </template>
  </div>
</template>
