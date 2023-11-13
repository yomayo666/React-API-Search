module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
      // Добавьте сюда любые пути для файлов, которые нужно мокировать
      '\\.(css|less|scss|sss|styl)$': 'identity-obj-proxy',
      '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
  };
  