<script setup lang="ts">
useHead({
  title: 'Externa Nuxt starter',
  meta: [
    {
      name: 'description',
      content: 'Minimal headless frontend against Externa Public CMS API',
    },
  ],
})
</script>

<template>
  <div>
    <header class="site-header">
      <NuxtLink to="/">
        Externa starter
      </NuxtLink>
    </header>
    <main class="site-main">
      <slot />
    </main>
  </div>
</template>
