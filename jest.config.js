const { pathsToModuleNameMapper } = require('ts-jest'); // eslint-disable-line
const { compilerOptions } = require('./tsconfig.json'); // eslint-disable-line

delete compilerOptions.paths['*'];

module.exports = {
    globalSetup: '<rootDir>/tests/scripts/global-setup.ts',
    globalTeardown: '<rootDir>/tests/scripts/global-teardown.ts',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
    }),
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>/tests/scripts/setup-files-after-env.ts'],
    testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
};
