export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: false,
  server:{
    port:3001
  },
  head: {
    title: 'album',
    htmlAttrs: {
      lang: 'en'

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

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // '@/node_modules/bootstrap/dist/css/bootstrap.min.css',
    // '@/assets/styles/main.scss',
    // '@/assets/styles/index.scss',
    // '@/assets/styles/spacer.scss',
  ],

  // GLOBAL SCSS VARIABLES
  styleResources: {
    scss: [
      // '~/assets/styles/variables.scss',
    ]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/Repository' },
    { src: '@/plugins/cookies' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],

  // axios: {
  //     // baseURL: 'https://b2b.pana.daladev.kz/'
  //         proxy: true
  // },
  // proxy:{
  //   // '/auth/':process.env.AUTH_URL,
  //   "/auth/": {
  //     target: process.env.AUTH_URL,
  //     pathRewrite: { "^/auth/": "" }
  //   },
  //   '/b2b/':process.env.B2B_URL
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  env: {
    authUrl: process.env.AUTH_URL,
    b2bUrl: process.env.B2B_URL
  },

  router: {
    // middleware: "auth",
    prefetchLinks: false
  }


}
