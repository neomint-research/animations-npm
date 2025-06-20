module.exports = {
  // Test environment configuration
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost'
  },
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  
  // Test patterns
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/coverage/'
  ],
  
  // Module resolution
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  
  // Transform configuration
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(iconoir-react)/)'
  ],
  
  // Coverage configuration
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/setupTests.js',
    '!src/**/*.types.js',
    '!src/**/index.js',
    '!src/**/*.stories.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html', 'json'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  
  // Performance and optimization
  maxWorkers: '50%',
  cacheDirectory: '.jest-cache',
  clearMocks: true,
  restoreMocks: true,
  
  // Error handling
  errorOnDeprecated: true,
  
  // Timeouts
  testTimeout: 10000,
  
  // Reporting
  verbose: true,
  notify: false,
  notifyMode: 'failure-change'
};