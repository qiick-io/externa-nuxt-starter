// https://nuxt.com/docs/api/configuration/nuxt-config
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
