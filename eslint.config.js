import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import globals from "globals";

export default [
  { ignores: [".astro/", "dist/", "node_modules/", "private/"] },
  js.configs.recommended,
  ...astro.configs.recommended,
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
];
