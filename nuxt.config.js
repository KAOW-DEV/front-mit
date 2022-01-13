import colors from "vuetify/es5/util/colors";

const base_url = "http://localhost:1337/api";

export default {
  // Base url
  env: {
    baseUrl: process.env.BASE_URL || "http://localhost:1337/api",
  },
  target: "static",
  ssr: false,
  // target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - stock",
    title: "stock",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "description",
        name: "description",
        content: "",
      },
      {
        name: "format-detection",
        content: "telephone=no",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    "nuxt-sweetalert2",
  ],

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: base_url + "/auth/local",
            method: "post",
            propertyName: "jwt",
          },
          user: {
            url: "users/me",
            method: "get",
            propertyName: false,
          },
          logout: false,
        },
      },
    },
  },

  // // Axios module configuration: https://go.nuxtjs.dev/config-axios
  // axios: {
  //   baseUrl: base_url,
  //   proxyHeaders: false,
  //   credentials: false,
  //   cors: true,
  // },
  // // router: {
  // //   middleware: ['auth']
  // // },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};