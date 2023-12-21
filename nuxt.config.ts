// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss', 
    'nuxt-icon',
    '@pinia/nuxt',
    '@hebilicious/vue-query-nuxt',
  ],
  pinia: {
    storesDirs: ['./store/**']
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
})
