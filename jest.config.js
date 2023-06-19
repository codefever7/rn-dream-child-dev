module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['jest-enzyme', '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js'],
  watchPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/vendor/',
    '<rootDir>/ios/',
    '<rootDir>/android/',
    '<rootDir>/e2e/',
  ],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/__mocks__/svgMock.js',
    '\\.webp$': '<rootDir>/__mocks__/requireMock.js',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es)/'],
  testEnvironment: 'enzyme',
  resetMocks: true,
  coverageThreshold: {
    global: {
      statements: 80,
    },
  },
};
