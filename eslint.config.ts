// SPDX-FileCopyrightText: 2026 Sefa Eyeoglu <contact@scrumplex.net>
//
// SPDX-License-Identifier: MIT

import eslintConfigPrettier from "eslint-config-prettier/flat";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import mochaPlugin from "eslint-plugin-mocha";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["src/*.{js,ts}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      mochaPlugin.configs.recommended,
    ],
    languageOptions: {
      globals: globals.node,
      parserOptions: { projectService: true },
    },
    rules: {
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowTaggedTemplates: true,
        },
      ],
    },
  },
  eslintConfigPrettier,
]);
