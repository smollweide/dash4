const config = require('@dash4/config/jest.server.config');

config.collectCoverageFrom = [
	'src/**/*.{ts,tsx}',
	'!src/run.ts',
	'!src/get-program.ts',
	'!**/node_modules/**',
	'!**/dist/**',
	'!**/build/**',
];

module.exports = config;
