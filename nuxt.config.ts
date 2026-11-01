// https://nuxt.com/docs/4.x/getting-started/upgrade
// Nuxt 4 srcDir is `app/`. `server/` and `shared/` stay at the repo root.
// `~` is `app/`; `#shared` is `shared/`.
export default defineNuxtConfig({
  compatibilityDate: '2025-09-01',
  devtools: { enabled: false },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  css: ['~/assets/css/main.css'],
  // Private keys — never put under runtimeConfig.public.
  // Values come from EXTERNA_* (parity with Next starter).
  runtimeConfig: {
    externaApiUrl: process.env.EXTERNA_API_URL ?? '',
    externaApiKey: process.env.EXTERNA_API_KEY ?? '',
    externaCollection: process.env.EXTERNA_COLLECTION ?? '',
  },
  eslint: {
    config: {
      stylistic: false,
    },
  },
  modules: ['@nuxt/eslint'],
})
