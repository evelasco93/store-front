/** @type {import('jest').Config} */
const config = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  testEnvironment: "jsdom",
};

export default config;