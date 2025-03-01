import antfu from "@antfu/eslint-config";
import eslintConfigPrettier from "eslint-config-prettier";

export default antfu({
  formatters: true,
  react: true,
  stylistic: {
    indent: 2,
    quotes: "double",
    semi: true,
  },
}).append(eslintConfigPrettier);
