module.exports = {
  extends: [
    // require.resolve('@hb/codestyle-linter/rcs/eslintrc.js'),
    'plugin:vue/essential',
  ],
  ignorePatterns: ['*.ejs'],
  rules: {
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "vue/no-multiple-template-root": 'off',
    'vue/multi-word-component-names': 'off',
    "no-unused-vars": "on"
  }
};
