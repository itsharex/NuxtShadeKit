<script setup lang="ts">
import { Sparkles } from "@lucide/vue";

const { loggedIn, openInPopup } = useUserSession();
const { t } = useI18n();

useHead(() => ({
  title: t("meta.loginTitle"),
  meta: [
    {
      name: "description",
      content: t("meta.loginDescription"),
    },
  ],
}));

onMounted(() => {
  if (loggedIn.value) {
    navigateTo("/");
  }
});

watch(loggedIn, (newVal) => {
  if (newVal) {
    navigateTo("/");
  }
});

const loginWithGithub = () => {
  openInPopup("/auth/github");
};
</script>

<template>
  <div
    class="flex h-full flex-col items-center justify-center gap-6 p-6 md:p-10"
  >
    <div
      class="flex w-full max-w-sm flex-col gap-6 rounded-md border border-border p-6"
    >
      <a href="#" class="flex items-center gap-2 self-center font-medium">
        <div
          class="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground"
        >
          <Sparkles class="size-4" />
        </div>
        {{ $t("meta.title") }}
      </a>
      <div class="flex flex-col gap-6">
        <Button variant="outline" type="button" @click="loginWithGithub">
          {{ $t("pages.login.title") }}
        </Button>
        <div class="px-6 text-center">
          <i18n-t keypath="pages.login.terms" tag="span">
            <template #0>
              <NuxtLink to="#" class="underline-offset-4 hover:underline">{{
                $t("pages.login.termsOfService")
              }}</NuxtLink>
            </template>
            <template #1>
              <NuxtLink to="#" class="underline-offset-4 hover:underline">{{
                $t("pages.login.privacyPolicy")
              }}</NuxtLink>
            </template>
          </i18n-t>
        </div>
      </div>
    </div>
  </div>
</template>
