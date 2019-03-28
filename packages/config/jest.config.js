const path = require('path');

module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	testPathIgnorePatterns: ['/node_modules/', '/src/server/'],
	setupFilesAfterEnv: [path.join(__dirname, 'rtl.setup.js')],
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.json',
		},
	},
};
