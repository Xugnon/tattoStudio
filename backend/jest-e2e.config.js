const jestConfig = require("./jest.config");

module.exports = {
  ...jestConfig,
  testEnvironment: "./prisma/prisma-test-environment.js",
  testRegex: ".e2e-spec.js$",
};
