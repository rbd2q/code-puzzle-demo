// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  plugins: [{ src: '~/plugins/highlight.ts' }],
  modules: [
    "@pinia/nuxt",
  ],
  css: ['~/assets/styles/main.css', '@geeckocom/activity-ui/dist/style.css'],
  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
