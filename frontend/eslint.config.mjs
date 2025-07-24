import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks"; // Importa el plugin react-hooks
import pluginJsxA11y from "eslint-plugin-jsx-a11y"; // Importa el plugin jsx-a11y
import babelParser from "@babel/eslint-parser"; // Usa babel-eslint para poder analizar JSX

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { 
      globals: globals.browser,
      parser: babelParser, // Especificamos el parser para JSX
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true, // Permite que ESLint procese JSX
        },
      },
    },
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "jsx-a11y": pluginJsxA11y,
    },
    rules: {
      "no-unused-vars": "warn",
      "eqeqeq": "error",
      "react-hooks/exhaustive-deps": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
    },
  },
  pluginJs.configs.recommended, // Usa la configuración recomendada para JS
];
