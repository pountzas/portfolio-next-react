import next from "eslint-config-next";

const eslintConfig = [
  {
    ignores: [".next/**"],
  },
  ...next,
];

export default eslintConfig;
