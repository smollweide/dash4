const config = require('@dash4/config/jest.server.config');

config.collectCoverageFrom = ['src/**/*.{ts,tsx}', '!**/node_modules/**', '!**/build/**'];

module.exports = config;
