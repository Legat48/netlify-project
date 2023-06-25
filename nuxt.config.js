export default {
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  head: {
    titleTemplate: 'Ranks quiz',
    title: 'Ranks quiz',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  server: {
    port: 8881 // default: 3000
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/fonts/Inter/inter.css',
    '~/assets/fonts/DelaGothicOne.css',
    'flag-icons/css/flag-icons.css',
    '~/assets/scss/style.scss'
  ],
  // Путь к резервному HTML-файлу
  generate: {
    fallback: true
  },
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },

  styleResources: {
    scss: ['~/assets/scss/scss/*.scss']
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    true: true
    // dirs: [
    //   '~/components'
    // ]
  },
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/svg',
    // плагин для подкгрузки ENV
    '@nuxtjs/dotenv'
  ],
  svgSprite: {
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
    ['nuxt-stripe-module', {
      publishableKey: 'pk_live_51LrP3yKFgb67L964suZAG44GW77SOXz8jLa66Y7luGgbK05ynj4VtrksTQMIT03p3VnEdAizwVJtJd3KDujPhOmc00Xg4oawHA'
    }],
    '@nuxtjs/axios'
    // '@nuxtjs/i18n'
  ],
  plugins: [
  ],

  publicRuntimeConfig: {
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#4ed2ff',
          accent: '#252525',
          secondary: '#368dc5',
          info: '#ffffff',
          warning: '#fec500',
          error: '#ff0000',
          success: '#2cdd9b',
          disabled: '#EA0C0E',
          active: '#FFFFFF',
          background: '#0c0c0c',
          ranksRed: '#EA0C0E'
        },
        light: {
          primary: '#1C2D3C',
          accent: '#F4F4F7',
          secondary: '#368dc5',
          info: '#0c0c0c',
          warning: '#fec500',
          error: '#FF0000',
          success: '#2cdd9b',
          disabled: '#EA0C0E',
          active: '#dedede',
          background: '#FFFFFF',
          ranksRed: '#EA0C0E'
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
  // Locales /импорт текстов
  // i18n
}
