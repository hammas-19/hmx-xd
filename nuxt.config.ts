// nuxt.config.ts
// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  // Basic SEO Configuration
  app: {
    head: {
      title: 'Hammas Masood - Frontend Developer Portfolio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Portfolio of a skilled Frontend Developer specializing in Vue.js, Nuxt.js, Python, and modern web technologies. View my latest projects including e-commerce platforms, PWAs, and educational websites.' },
        { name: 'keywords', content: 'Frontend Developer, web developer, Vue.js, Nuxt.js, Python, JavaScript, portfolio' },
        { name: 'author', content: 'Hammas Masood' },
        { name: 'robots', content: 'index, follow' },

        // Open Graph (Social Media)
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Hammas Masood - Frontend Developer Portfolio' },
        { property: 'og:description', content: 'Portfolio showcasing modern web development projects including e-commerce platforms, PWAs, and educational websites built with Vue.js, Nuxt.js, and Python.' },
        { property: 'og:image', content: '/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:url', content: 'https://hammasmasood.netlify.app/' },
        { property: 'og:site_name', content: 'Hammas Masood Portfolio' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Hammas Masood - Frontend Developer Portfolio' },
        { name: 'twitter:description', content: 'Portfolio showcasing modern web development projects built with Vue.js, Nuxt.js, and Python.' },
        { name: 'twitter:image', content: '/og-image.png' },

        // Additional SEO
        { name: 'theme-color', content: '#000000' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://hammasmasood.netlify.app/' }
      ]
    }
  },

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
    '@nuxt/scripts',
    'motion-v/nuxt'
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