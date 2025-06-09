const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  collectCoverageFrom: [
  "src/**/*.{ts,tsx}",
  "!src/**/*.d.ts",
  "!src/app/**/*.tsx",
  "!src/interfaces/**/*.ts",     
  "!src/**/mocks/**",            
  "!src/setupTests.ts",         
],
};