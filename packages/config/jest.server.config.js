module.exports = {
	preset: 'ts-jest',
	coverageDirectory: 'coverage-server',
	testEnvironment: 'node',
	testPathIgnorePatterns: ['/node_modules/', '/src/client/'],
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.server.json',
		},
	},
};
