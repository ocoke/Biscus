// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    includeWorkspace: true
  },
  runtimeConfig: {
    githubToken: '',
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        // { rel: 'preload', as: 'style', href: 'https://fonts.googleapis.cn/css2?family=Noto+Serif+SC:wght@300;500;600;700&display=swap' },
        { rel: 'preload', as: 'style', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@300;500;600;700&display=swap' },
        // { rel: 'stylesheet', href: 'https://fonts.googleapis.cn/css2?family=Noto+Serif+SC:wght@300;500;600;700&display=swap', media: 'print', onload: "this.media='all'" },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@300;500;600;700&display=swap', media: 'print', onload: 'this.media=\'all\'' },
      ],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  }
})
