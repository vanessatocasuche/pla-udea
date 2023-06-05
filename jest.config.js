module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  //testEnvironment: 'jest-environment-jsdom-fourteen',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  testMatch: ['**/__tests__/**/*.test.js'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  modulePathIgnorePatterns: [
    '<rootDir>/src/__tests__/styles/*',
    '<rootDir>/src/theme/*',
    '<rootDir>/src/Icons/*'
  ]

}
