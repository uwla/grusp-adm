export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'GRUSP ADMIN',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['~/assets/css/main.css'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~/plugins/vue-data-table.js',
        '~/plugins/vue-form-builder.js',
        '~/plugins/vue-anka-cropper.js',
        '~/plugins/vue-multiselect.js',
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        // '@nuxtjs/eslint-module',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: ['@nuxtjs/axios', '@nuxtjs/auth-next', 'bootstrap-vue/nuxt'],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    // MODULES

    axios: {
        credentials: true,

        // Axios interceptor to add the bearer token to requests
        interceptors: {
            request: config => {
                const token = $auth.strategy.token.get()
                if (token) {
                    config.headers.common['Authorization'] = `Bearer ${token}`
                }
                return config
            },
        },
    },

    auth: {
        strategies: {
            local: {
                provider: 'local',
                endpoints: {
                    login: { url: '/auth/login/admin', method: 'post' },
                    logout: { url: '/auth/logout', method: 'post' },
                    user: { url: '/account/profile', method: 'get' },
                },
                token: {
                    property: 'token',
                    type: 'Bearer',
                    required: true,
                },
                user: {
                    property: false,
                    autoFetch: false,
                },
            },
        },
        redirect: {
            login: '/conta/entrar',
            logout: '/conta/entrar',
        },
    },

    bootstrapVue: {
        icons: true,
    },

    // telemetry
    telemetry: false,
}
