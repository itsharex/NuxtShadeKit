<script setup>
import { Languages } from "@lucide/vue";
const { locales } = useI18n();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon">
        <Languages class="size-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="center">
      <DropdownMenuGroup>
        <SwitchLocalePathLink
          v-for="loc in locales"
          :key="loc.code"
          :locale="loc.code"
        >
          <DropdownMenuItem>
            {{ loc.name }}
            <DropdownMenuShortcut>{{ loc.code }}</DropdownMenuShortcut>
          </DropdownMenuItem>
        </SwitchLocalePathLink>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
