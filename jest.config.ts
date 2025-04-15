import type { Config } from 'jest'

const config: Config = {
 preset: 'ts-jest',
 testEnvironment: 'jsdom',
 setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
 moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
 testMatch: ['**/*.test.(ts|tsx)'],
 transform: {
  '^.+\\.(ts|tsx)$': 'ts-jest',
 },
 //  to find modules in /src
 moduleNameMapper: {
  //yours mocks will be reconized by jest if your refer here
  '^@ama-pt/agora-design-system$': '<rootDir>/__mocks__/agora-design-system.tsx',
  '^src/(.*)$': '<rootDir>/src/$1',
  '^@test/(.*)$': '<rootDir>/src/test/$1',
 }
}

export default config
