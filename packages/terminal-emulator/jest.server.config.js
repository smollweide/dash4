const config = require('@dash4/config/jest.server.config');

config.collectCoverageFrom = ['<rootDir>/src/**/*.{ts,tsx}', '!<rootDir>/node_modules/**', '!<rootDir>/build/**'];

module.exports = config;
