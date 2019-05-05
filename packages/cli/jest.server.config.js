const config = require('@dash4/config/jest.server.config');

config.collectCoverageFrom = [
	'<rootDir>/src/**/*.{ts,tsx}',
	'!<rootDir>/src/run.ts',
	'!<rootDir>/src/get-program.ts',
	'!<rootDir>/node_modules/**',
	'!<rootDir>/dist/**',
	'!<rootDir>/build/**',
];

module.exports = config;
