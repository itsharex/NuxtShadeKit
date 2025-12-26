import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-12-11",
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css"],
  modules: ["@nuxt/eslint", "shadcn-nuxt", "nuxt-auth-utils", "nuxt-security", "@nuxtjs/i18n"],
  nitro: {
    imports: {
      dirs: ["./server/types"],
    },
    ...(process.env.NUXT_PRESET && {
      preset: process.env.NUXT_PRESET,
      ...(process.env.NUXT_PRESET === "cloudflare-pages" && {
        cloudflare: {
          deployConfig: true,
          nodeCompat: true,
        },
      }),
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    oauth: {
      github: {
        clientId: "",
        clientSecret: "",
      },
    },
  },
  security: {
    csrf: true,
    headers: {
      contentSecurityPolicy: {
        "img-src": ["'self'", "data:", "https:"],
      },
    },
  },
  routeRules: {
    "/api/**": {
      csurf: {
        enabled: true,
        methodsToProtect: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      },
    },
    "/api/_auth/session": {
      csurf: {
        enabled: false,
      },
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: "@/components/ui",
  },
  i18n: {
    defaultLocale: "zh",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "lang",
      redirectOn: "root",
      alwaysRedirect: true,
    },
    locales: [
      {
        code: "zh",
        name: "简体中文",
        file: "zh-CN.json",
      },
      {
        code: "en",
        name: "English",
        file: "en-US.json",
      },
      {
        code: "ja",
        name: "日本語",
        file: "ja-JP.json",
      },
      {
        code: "ko",
        name: "한국어",
        file: "ko-KR.json",
      },
    ],
  },
});
