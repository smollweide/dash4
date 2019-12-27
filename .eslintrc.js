module.exports = {
	extends: [
		'@namics/eslint-config/configurations/es8-node.js',
		'@namics/eslint-config/configurations/es8-node-disable-styles.js',
	].map(require.resolve),
	rules: {
		complexity: 0,
		'global-require': 0,
		'require-jsdoc': 0,
		'id-blacklist': 0,
		'no-await-in-loop': 0,
		'no-console': 0,
		'prefer-template': 0,
	},
	settings: {
		react: {
			pragma: 'React',
			version: '16.0',
		},
	},
	overrides: [
		{
			files: ['**/*.ts', '**/*.tsx'],
			extends: [
				'@namics/eslint-config/configurations/typescript-node.js',
				'@namics/eslint-config/configurations/typescript-node-disable-styles.js',
			].map(require.resolve),
			rules: {
				complexity: 0,
				'@typescript-eslint/member-naming': 0,
			},
		},
		{
			files: [
				'packages/client/src/**/*.ts',
				'packages/client/src/**/*.tsx',
				'packages/react-xterm/src/**/*.ts',
				'packages/react-xterm/src/**/*.tsx',
				'packages/react-xterm/demo/**/*.ts',
				'packages/react-xterm/demo/**/*.tsx',
				'packages/ui/src/**/*.ts',
				'packages/ui/src/**/*.tsx',
				'plugins/*/src/client/**/*.ts',
				'plugins/*/src/client/**/*.tsx',
			],
			extends: [
				'@namics/eslint-config/configurations/typescript-react.js',
				'@namics/eslint-config/configurations/typescript-react-disable-styles.js',
			].map(require.resolve),
			rules: {
				complexity: 0,
				'@typescript-eslint/member-ordering': 0,
				'@typescript-eslint/member-naming': 0,
				'react/prop-types': 0,
			},
			globals: {
				module: true,
			},
		},
		{
			files: ['**/*.spec.ts', '**/*.spec.tsx'],
			rules: {
				'import/imports-first': 0,
				'no-console': 0,
				'@typescript-eslint/ban-ts-ignore': 0,
				'react/display-name': 0,
			},
		},
	],
};
