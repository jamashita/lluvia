module.exports = {
  verbose: true,
  bail: true,
  forceExit: true,
  roots: [
    'packages'
  ],
  testRegex: '/__tests__/.+\\.spec\\.tsx?$',
  testPathIgnorePatterns: [
    'node_modules',
    'dist'
  ],
  transform: {
    '^.+\\.tsx?$': '@swc/jest'
  },
  moduleNameMapper: {
    '^@jamashita/lluvia-(.*)$': '<rootDir>/packages/$1/src/index'
  },
  moduleFileExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx'
  ],
  testEnvironmentOptions: {
    url: 'http://localhost'
  }
};
