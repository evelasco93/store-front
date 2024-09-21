/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@store-front-typescript-bootcamp/eslint-config/index.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ["./tsconfig.json", "./tsconfig.test.json"],
  },
}
