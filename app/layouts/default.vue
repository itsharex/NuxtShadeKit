<script lang="ts" setup>
import { LogIn, Sparkles } from "@lucide/vue";

const { loggedIn, user, clear } = useUserSession();

const router = useRouter();
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Navigation Bar -->
    <header
      class="sticky top-0 z-20 flex h-12 w-full shrink-0 items-center justify-between border-b bg-background/95 px-4 backdrop-blur-lg ease-linear supports-backdrop-filter:bg-background/60"
    >
      <div
        class="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <div class="flex items-center gap-2">
          <div
            class="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground"
          >
            <Sparkles class="size-4" />
          </div>
          <span class="font-semibold">{{ $t("meta.title") }}</span>
        </div>
        <div class="flex items-center gap-4">
          <I18nSwitch />
          <ColorModeButton />
          <template v-if="loggedIn">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar class="h-full">
                  <AvatarImage :src="user?.avatar || ''" :alt="user?.name" />
                  <AvatarFallback>{{ user?.name.charAt(0) }}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel
                  >{{ $t("layout.name") }} {{ user!.name }}</DropdownMenuLabel
                >
                <DropdownMenuLabel
                  >{{ $t("layout.email") }} {{ user!.email }}</DropdownMenuLabel
                >
                <DropdownMenuSeparator />
                <DropdownMenuItem class="cursor-pointer" @click="clear">{{
                  $t("layout.logout")
                }}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </template>
          <Button
            v-else
            variant="default"
            @click="router.push($localePath('/login'))"
          >
            <LogIn class="mr-2 size-4" />
            {{ $t("layout.login") }}
          </Button>
        </div>
      </div>
    </header>

    <main class="h-[calc(100vh-48px)]">
      <slot />
    </main>
  </div>
</template>
