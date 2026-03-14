import js from "@eslint/js";
import react from "eslint-plugin-react";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx"],
    plugins: { react },
    rules: {
      "no-unused-vars": "warn",
      "react/prop-types": "warn",
    }
  }
];