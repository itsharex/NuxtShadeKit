import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["import", "vue"],
  options: {
    typeAware: true,
  },
  ignorePatterns: ["dist/**", ".nuxt/**", "app/components/ui/**"],
});
