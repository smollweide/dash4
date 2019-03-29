const path = require('path');

module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	testPathIgnorePatterns: ['/node_modules/', '/src/server/', 'build', 'dist'],
	setupFilesAfterEnv: [path.join(__dirname, 'rtl.setup.js')],
	transform: {
		'^.+\\.(t|j)sx?$': 'ts-jest',
	},
	transformIgnorePatterns: ['node_modules/(?!(@dash4)/)', 'node_modules/(?!(dash4)/)'],
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.test.json',
		},
	},
	collectCoverageFrom: ['src/client/**/*.{ts,tsx}', '!**/node_modules/**', '!**/dist/**', '!**/build/**'],
};
