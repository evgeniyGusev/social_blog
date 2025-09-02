// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'app/',
  compatibilityDate: '2024-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/test-utils', '@nuxt/ui', '@pinia/nuxt'],
  devServer: { port: 3332 },
  ssr: true,
  nitro: {
    experimental: {
      wasm: true
    },
    routeRules: {
      '/api/**': { prerender: false, index: false, headers: { 'cache-control': 'no-cache' } }
    }
  },
  router: {
    options: {
      strict: false
    }
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  css: ['@/assets/styles/style.scss'],
  icon: {
    customCollections: [{
      prefix: 'custom',
      dir: './app/assets/icons'
    }]
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/variables.scss" as *;'
        }
      }
    },
    server: {
      fs: {
        strict: false,
        allow: ['..']
      }
    },
    base: '/',
    build: {
      rollupOptions: {
        external: []
      }
    }
  }
})
