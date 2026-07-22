<script lang="ts" setup>
import { Rocket, ArrowRight, LoaderCircle } from "@lucide/vue";
import { toast } from "vue-sonner";

import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const loading = ref(false);

const getSentence = async () => {
  loading.value = true;
  try {
    const { headerName, csrf } = useCsrf();
    const { code, message, data } = await $fetch<
      Response<{ hitokoto: string; from: string }>
    >("/api/sentence", {
      method: "POST",
      headers: {
        [headerName]: csrf,
      },
    });
    if (code === 200) {
      toast.success(data?.hitokoto || "");
    } else if (code === 401) {
      toast.warning(message);
      navigateTo("/login");
    } else {
      toast.error(message);
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section
    class="relative h-full overflow-hidden bg-linear-to-b from-background to-muted/80"
  >
    <div class="mx-auto max-w-3xl pt-24 text-center">
      <Badge variant="secondary" class="mb-4">
        <Rocket class="mr-2 size-3" />
        {{ $t("pages.index.badge") }}
      </Badge>
      <h1
        class="mb-6 px-6 text-4xl font-bold tracking-tight sm:text-5xl md:px-0 md:text-6xl lg:text-7xl"
      >
        {{ $t("pages.index.title") }}
        <span
          class="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent"
          >{{ $t("pages.index.titleHighlight") }}</span
        >
      </h1>
      <p class="mb-8 px-4 text-lg text-muted-foreground sm:text-xl md:px-0">
        {{ $t("pages.index.description") }}
      </p>
      <div
        class="flex flex-col gap-4 px-6 sm:flex-row sm:justify-center sm:px-0"
      >
        <NuxtLink
          to="https://github.com/hujix/NuxtShadeKit?tab=readme-ov-file#nuxtshadekit"
          target="_blank"
          :class="
            cn(buttonVariants({ variant: 'default', size: 'lg' }), 'group')
          "
        >
          {{ $t("pages.index.getStarted") }}
          <ArrowRight
            class="ml-2 size-4 transition-transform group-hover:translate-x-1"
          />
        </NuxtLink>
        <Button
          size="lg"
          variant="outline"
          :disabled="loading"
          @click="getSentence"
        >
          <LoaderCircle v-if="loading" class="size-4 animate-spin" />
          {{ $t("pages.index.hitokoto") }}
        </Button>
      </div>
    </div>
  </section>
</template>
