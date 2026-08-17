import eslintConfigPrettier from "eslint-config-prettier/flat";
import globals from "globals";
import js from "@eslint/js";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import tseslint from "typescript-eslint";
import mochaPlugin from "eslint-plugin-mocha";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["src/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
  },
  tseslint.configs.recommended,
  eslintConfigPrettier,
  { files: ["src/*.spec.ts"], ...mochaPlugin.configs.recommended },
  {
    files: ["**/*.json"],
    ignores: ["package-lock.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
  },
  {
    files: ["**/*.md"],
    plugins: { markdown },
    language: "markdown/gfm",
    extends: ["markdown/recommended"],
  },
]);
