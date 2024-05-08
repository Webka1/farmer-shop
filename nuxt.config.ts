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
   hooks: {
       "vite:extendConfig": (config, { isClient, isServer }) => {
          if (isClient) {
            // @ts-ignore
             config.vue =   "vue/dist/vue.esm-bundler";           
          }
       },
    },
 vite:{      
         vue: {
             script: {
                 defineModel: true,
                 propsDestructure: true                 
             }
         }
     
   }
})