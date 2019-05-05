module.exports = {
	preset: 'ts-jest',
	coverageDirectory: 'coverage-server',
	testEnvironment: 'node',
	testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/src/client/', '<rootDir>/build', '<rootDir>/dist'],
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.server.json',
		},
	},
	collectCoverageFrom: [
		'src/server/**/*.{ts,tsx}',
		'!<rootDir>/node_modules/**',
		'!<rootDir>/dist/**',
		'!<rootDir>/build/**',
	],
};
