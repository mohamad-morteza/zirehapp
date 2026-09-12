import { fileURLToPath } from 'url'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    'nuxt-i18n-micro',
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@nuxt/image',
    'nuxt-viewport',
    'nuxt-icons',
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: 'fa-IR',
        dir: 'rtl',
      },
      title: process.env.TITLE,
      link: [
        {
          rel: 'preload',
          type: 'font/woff2',
          href: '/fonts/Yekan-Bakh-Regular.woff2',
          as: 'font',
          crossorigin: 'anonymous',
          fetchpriority: 'high',
        },
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: `/favicon-${process.env.APP_KEY}.ico`,
        },
      ],
      meta: [
        {
          name: 'description',
          content: process.env.DESCRIPTION,
        },
      ],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      googlePlay: process.env.NUXT_PUBLIC_GOOGLE_PLAY || '',
      cafeBazar: process.env.NUXT_PUBLIC_CAFE_BAZAR || '',
      webApp: process.env.NUXT_PUBLIC_WEB_APP || '',
      sibIrani: process.env.NUXT_PUBLIC_SIB_IRANI || '',
      sibApp: process.env.NUXT_PUBLIC_SIB_APP || '',
      iApps: process.env.NUXT_PUBLIC_IAPPS || '',

      appUrl: process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:9090',
      appKey: process.env.APP_KEY,
      baseUrl: process.env.BASE_URL,
      origin: process.env.NODE_ENV == 'development' ? 'http://localhost:9090' : process.env.ORIGIN,
      baseUrlBrowser: process.env.BASE_URL_BROWSER,
      i18nLocale: process.env.I18N_LOCALE,
      fallbackI18nLocale: process.env.I18N_FALLBACK_LOCALE,

      homeTitle: process.env.TITLE,
      homeDescription: process.env.DESCRIPTION,
    },
  },

  alias: {
    website: fileURLToPath(new URL(`./websites/${process.env.APP_KEY}`, import.meta.url)),
  },
  routeRules: {
    '/profile/**': { ssr: false },
  },
  devServer: {
    port: 9090,
    host: 'localhost',
  },
  experimental: {
    defaults: {
      nuxtLink: {
        componentName: 'NuxtLink',
        trailingSlash: 'append',
      },
    },
  },

  compatibilityDate: '2025-04-16',
  nitro: { compressPublicAssets: { gzip: true, brotli: true } },

  eslint: {
    config: {
      stylistic: {
        indent: 2,
        semi: false,
        quotes: 'single',
        commaDangle: 'always-multiline',

        braceStyle: '1tbs',
        quoteProps: 'as-needed',
        blockSpacing: true,
      },
    },
  },

  i18n: {
    strategy: 'no_prefix',
    locales: [
      { code: 'fa', iso: 'fa-IR', dir: 'rtl' },
      { code: 'en', iso: 'en-US', dir: 'ltr', disabled: true },
      { code: 'ar', iso: 'ar-SA', dir: 'rtl', disabled: true },
    ],
    defaultLocale: 'fa',
    translationDir: 'locales',
    meta: false,
  },
  image: {
    domains: [],
  },

  viewport: {
    breakpoints: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
      '3xl': 1920,
    },
    defaultBreakpoints: {
      desktop: 'lg',
      mobile: 'xs',
      tablet: 'md',
    },
    fallbackBreakpoint: 'lg',
  },
})
