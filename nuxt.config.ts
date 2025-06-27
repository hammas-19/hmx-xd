// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts'
  ],
  fonts: {
    families: [
      {
        name: 'DM Sans',
        provider: 'google',
        weights: ['400', '500', '600', '700']
      },
      {
        name: 'Libre Baskerville',
        provider: 'google',
        weights: ['400', '700']
      },
      {
        name: 'Outfit',
        provider: 'google',
        weights: ['300', '400', '500', '600', '700']
      },
      {
        name: 'Inter',
        provider: 'google',
        weights: ['300', '400', '500', '600', '700']
      },
      {
        name: 'Poppins',
        provider: 'google',
        weights: ['300', '400', '500', '600', '700']
      }
    ]
  }
})