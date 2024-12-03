import globals from "globals";
import pluginJs from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin-js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-console": "off",
      "no-unused-vars": "off",
      "no-undef": "off",
    },
  },
  { 
    ignores: ["dist/**"],
  },
  ...(pluginJs.configs.recommended ? [pluginJs.configs.recommended] : []),
  ...(stylisticJs.configs.recommended ? [stylisticJs.configs.recommended] : []),
];