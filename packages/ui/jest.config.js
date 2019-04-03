const config = require('@dash4/config/jest.config');
config.collectCoverageFrom = [
	'src/**/*.{ts,tsx}',
	'!src/index.tsx',
	'!src/**/*.stories.{ts,tsx}',
	'!src/**/*.d.{ts,tsx}',
	'!**/node_modules/**',
	'!**/dist/**',
	'!**/build/**',
];
module.exports = config;
