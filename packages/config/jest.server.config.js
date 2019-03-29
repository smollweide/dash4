module.exports = {
	preset: 'ts-jest',
	coverageDirectory: 'coverage-server',
	testEnvironment: 'node',
	testPathIgnorePatterns: ['/node_modules/', '/src/client/', 'build', 'dist'],
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.server.json',
		},
	},
	collectCoverageFrom: ['src/server/**/*.{ts,tsx}', '!**/node_modules/**', '!**/dist/**', '!**/build/**'],
};
