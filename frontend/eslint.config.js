import js from "@eslint/js";
import react from "eslint-plugin-react";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx"],
    plugins: { react },
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        }
      },
      globals: {
        console: "readonly",
        process: "readonly",
        window: "readonly",
        document: "readonly",
        fetch: "readonly",        // fix 'fetch is not defined'
        alert: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
      }
    },
    settings: {
      react: {
        version: "detect",
      }
    },
   rules: {
  "no-unused-vars": ["warn", { 
    "varsIgnorePattern": "^React$|^App$" 
  }],
  "react/react-in-jsx-scope": "off",
}
  }
];