module.exports = {
  extends: ["../../.eslintrc.js"],
  overrides: [
    {
      files: ["*.ts", "*.test.js"],
    },
    {
      files: ["*/**/ducks/*.ts"],
      rules: {
        "no-param-reassign": "off",
      },
    },
  ],
};
