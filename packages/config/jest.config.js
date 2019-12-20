const path = require('path');

module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/src/server/', '<rootDir>/build', '<rootDir>/dist'],
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
	moduleNameMapper: {
		'\\.(scss|sass|css|less)$': 'identity-obj-proxy',
	},
	collectCoverageFrom: [
		'<rootDir>/src/client/**/*.{ts,tsx}',
		'!<rootDir>/node_modules/**',
		'!<rootDir>/dist/**',
		'!<rootDir>/build/**',
	],
	snapshotSerializers: ['jest-emotion'],
};
