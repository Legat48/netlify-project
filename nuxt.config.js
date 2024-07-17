export default {
  ssr: true,

  router: {
    base: '/ods/'
  },

  target: 'server',

  head: {
    title: 'ОДС',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ]
  },
  server: {
    port: 8881
  },
  css: [
    '~/assets/fonts/pt/pt.css',
    '~/assets/scss/style.scss'
  ],
  // Путь к резервному HTML-файлу
  generate: {
    fallback: true
  },
  render: {
    bundleRenderer: {
      shouldPreload: (_file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },

  styleResources: {
    scss: ['~/assets/scss/scss/*.scss']
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    true: true,
    dirs: [
      '~/components',
      '~/components/items',
      '~/components/smelting',
      '~/components/svg',
      '~/components/acv',
      '~/components/table',
      '~/components/mnlz',
      '~/components/udm',
      '~/components/userStat',
      '~/components/mixer',
      '~/components/eqstatus'
    ]
  },
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build',
    '@nuxtjs/svg'
  ],

  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios'
  ],
  plugins: [
    '~/plugins/foo.js'
  ],
  publicRuntimeConfig: {
  },

  axios: {
    baseURL: '/ods/'
  },

  build: {
  }
}
