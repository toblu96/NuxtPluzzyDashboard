export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'NuxtPluzzyDashboard',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)

  plugins: [
    '~/plugins/influxdb.client.js',
    '~/plugins/handlebars.js',
    '~/plugins/swarmpit.js',
  ],

  serverMiddleware: [
    { path: "/api", handler: "~/api/rest.js" },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/moment',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/auth-next',
  ],
  publicRuntimeConfig: {
    GITLAB_BASEURL: process.env.GITLAB_BASEURL,
    GITLAB_PROJECT_PATH: process.env.GITLAB_PROJECT_PATH,
    NODERED_BASEURL: process.env.NODERED_BASEURL,
    SWARMPIT_BASEURL: process.env.SWARMPIT_BASEURL,
    SWARMPIT_TOKEN: process.env.SWARMPIT_TOKEN,
    INFLUXDB_BASEURL: process.env.INFLUXDB_BASEURL,
    INFLUXDB_TOKEN: process.env.INFLUXDB_TOKEN,
    INFLUXDB_ORGNAME: process.env.INFLUXDB_ORGNAME,
    GRAFANA_BASEURL: process.env.GRAFANA_BASEURL,
    DOCUMENTATION_URL: process.env.DOCUMENTATION_URL || 'https://github.com/toblu96/NuxtPluzzyDashboard',
    SUPPORT_URL: process.env.SUPPORT_URL || 'https://github.com/toblu96/NuxtPluzzyDashboard/discussions',
  },
  privateRuntimeConfig: {
    GITLAB_CLIENTID: process.env.GITLAB_CLIENTID,
    GITLAB_CLIENTSECRET: process.env.GITLAB_CLIENTSECRET,
  },
  router: {
    middleware: ['auth'],
    prefetchLinks: false,
  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login/callback',
      home: '/project'
    },
    // https://docs.gitlab.com/ee/api/oauth2.html#web-application-flow
    strategies: {
      github: {
        // clientId: process.env.GITLAB_CLIENTID,
        // clientSecret: process.env.GITLAB_CLIENTSECRET,
        // endpoints: {
        //   authorization: process.env.GITLAB_BASEURL + '/oauth/authorize',
        //   token: process.env.GITLAB_BASEURL + '/oauth/token',
        //   userInfo: process.env.GITLAB_BASEURL + '/api/v4/user',
        // },
        scope: 'api read_api read_user write_repository',
        grantType: 'authorization_code',
      },
    },
    plugins: [
      '~/plugins/gitApi.js',
      '~/plugins/auth.js',
    ]
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
