import { defineConfig } from "oxfmt";

export default defineConfig({
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  printWidth: 80,
  trailingComma: "all",
  sortImports: {
    newlinesBetween: true,
  },
  sortTailwindcss: {
    stylesheet: "app/assets/css/tailwind.css",
    functions: ["clsx", "cn"],
    preserveWhitespace: true,
  },
  sortPackageJson: true,
  ignorePatterns: ["dist/**", ".nuxt/**", "app/components/ui/**", "*.min.js"],
});
