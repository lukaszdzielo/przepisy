// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  app: {
    baseURL: '/przepisy/',
  },
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
  ],
  content: {
    renderer: {
      anchorLinks: { h2: false, h3: false, h4: false }
    }
  },
  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 256
    }
  }
})