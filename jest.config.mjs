export default {
  testEnvironment: 'jsdom',
  roots: [
    "<rootDir>/__tests__",
    "<rootDir>/src/modules",
    "<rootDir>/src/services",
    "<rootDir>/src/objects"
  ],
  testMatch: [
    "<rootDir>/__tests__/unit/modules/*.module.test.js",
    "<rootDir>/__tests__/unit/objects/*.test.js",
    "<rootDir>/__tests__/unit/services/*.service.test.js"
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  transform: {
    "^.+\\.[jt]sx?$": ["babel-jest", { "configFile": "./.babelrc" }]
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/modules/*.module.js",
    "src/services/*.service.js",
    "src/objects/*.js",
    "!**/node_modules/**"
  ],
  coverageDirectory: "coverage/UNITS",
  coverageReporters: ["text", "lcov", "html", "json"]
};
