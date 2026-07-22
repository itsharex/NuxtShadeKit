<script lang="ts" setup>
import { Toaster } from "vue-sonner";

import "vue-sonner/style.css";

const { t } = useI18n();

useHead(() => ({
  title: t("meta.appTitle"),
  meta: [
    {
      name: "description",
      content: t("meta.appDescription"),
    },
    {
      name: "keywords",
      content: t("meta.appKeywords"),
    },
    { name: "author", content: "Hu.Sir" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { charset: "utf-8" },
    // Open Graph
    { property: "og:title", content: t("meta.ogTitle") },
    {
      property: "og:description",
      content: t("meta.ogDescription"),
    },
    { property: "og:type", content: "website" },
    // Twitter Card
    { name: "twitter:title", content: t("meta.twitterTitle") },
    {
      name: "twitter:description",
      content: t("meta.twitterDescription"),
    },
  ],
}));
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <ClientOnly>
      <Toaster :rich-colors="true" position="top-center" />
    </ClientOnly>
  </NuxtLayout>
</template>

<style>
* {
  scrollbar-width: thin;
  scrollbar-color: hsl(214.3 31.8% 91.4%) transparent;
}
</style>
