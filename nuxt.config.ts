// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@pinia/nuxt',
    "@nuxt/image",
    '@formkit/auto-animate/nuxt'
  ],
  pinia: {
    storesDirs: ['./store/**']
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
})