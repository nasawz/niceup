module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ["@typescript-eslint/eslint-plugin", "react", "react-hooks"],
  extends: [
    'plugin:@typescript-eslint/recommended',
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/interface-name-prefix": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "react-hooks/exhaustive-deps": 0,
    "react/display-name": 0
  },
  settings: {
    react: {
      version: "detect"
    }
  }
}