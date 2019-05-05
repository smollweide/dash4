const config = require('@dash4/config/jest.config');
config.collectCoverageFrom = [
	'<rootDir>/src/**/*.{ts,tsx}',
	'!<rootDir>/src/index.tsx',
	'!<rootDir>/src/**/*.stories.{ts,tsx}',
	'!<rootDir>/src/**/*.d.{ts,tsx}',
	'!<rootDir>/node_modules/**',
	'!<rootDir>/dist/**',
	'!<rootDir>/build/**',
];
module.exports = config;
