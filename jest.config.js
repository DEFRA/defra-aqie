/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['server/**/*.{js,ts}'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  clearMocks: true,
  coverageProvider: "v8",
  transformIgnorePatterns: [],
  moduleNameMapper: {
    'server/(.*)': '<rootDir/server/$1',
  },
  moduleDirectories: ['node_modules', 'server'],
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  verbose: true,
  forceExit: true,
};