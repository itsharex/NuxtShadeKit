<script setup lang="ts">
import { Moon, Sun } from "@lucide/vue";
import { useColorMode } from "@vueuse/core";

const colorMode = useColorMode();

const nextTheme = computed(() =>
  colorMode.value === "dark" ? "light" : "dark",
);

const switchTheme = () => {
  colorMode.value = nextTheme.value;
};

const startViewTransition = (event: MouseEvent) => {
  if (!document.startViewTransition) {
    switchTheme();
    return;
  }

  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  const transition = document.startViewTransition(() => {
    switchTheme();
  });

  transition.ready.then(() => {
    const duration = 600;
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: duration,
        easing: "cubic-bezier(.76,.32,.29,.99)",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  });
};
</script>

<template>
  <ClientOnly>
    <Button
      :aria-label="`Switch to ${nextTheme} mode`"
      variant="ghost"
      size="icon"
      @click="startViewTransition"
    >
      <Moon v-if="nextTheme === 'dark'" />
      <Sun v-else />
    </Button>
    <template #fallback>
      <Sun class="size-4" />
    </template>
  </ClientOnly>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-new(root) {
  z-index: 9999;
}
::view-transition-old(root) {
  z-index: 1;
}
</style>
