import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import eslintPluginPromise from 'eslint-plugin-promise';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import importPlugin from 'eslint-plugin-import';

export default [
  eslintPluginUnicorn.configs['flat/all'],
  eslintPluginPromise.configs['flat/recommended'],
  importPlugin.flatConfigs.recommended,
  {
    files: ["**/*.ts"],
  }, {
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: "module",
    },
    ignores: [
      'node_modules/**',
      "node_modules",
    ],

    rules: {
      ...js.configs.recommended.rules,
      curly: 0,
      eqeqeq: 1,
      "no-throw-literal": 1,
      semi: 1,
      "@typescript-eslint/naming-convention": [1, {
        selector: "import",
        format: ["camelCase", "PascalCase"],
      }],
      "@typescript-eslint/no-explicit-any": 0,  // allow any
      "@typescript-eslint/lines-between-class-members": 0,
      'semi': [2, "always"],
      'quotes': [2, "single"],
      "linebreak-style": 0,
      "no-multiple-empty-lines": 0,
      "no-multi-spaces": 1,
      "class-methods-use-this": 0,              // allow private methods as helpers
      'no-unused-vars': 1,
      "no-undef": 0,
      "no-restricted-syntax": 0,                // allow for...of
      "unicorn/no-array-for-each": 0,           // allow forEach
      "unicorn/no-null": 0,                     // prefer null > undefined
      "unicorn/prevent-abbreviations": 0,
      "unicorn/import-style": 0,
      "promise/catch-or-return": 0,
      "import/no-unresolved": 0,
      "import/extensions": 0,
    },
  }];