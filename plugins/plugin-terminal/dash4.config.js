const { PluginTerminal, jestCommands } = require('./build/server');

async function getConfig() {
	return {
		tabs: [
			{
				title: 'Root',
				rows: [
					[
						new PluginTerminal({
							cmd: 'npm run watch-test',
							cwd: '../../packages/ui',
							dark: true,
							autostart: false,
							allowedCommands: jestCommands,
							width: [12, 6, 8],
							height: 500,
						}),
						new PluginTerminal({
							cmd: 'npm run watch-test-server',
							dark: true,
							autostart: false,
							allowedCommands: jestCommands,
						}),
					],
					[
						new PluginTerminal({
							cmd: 'node ./bin/chalk.js',
							dark: true,
							autostart: true,
						}),
						new PluginTerminal({
							cmd: 'node ./bin/ora.js',
							dark: true,
							autostart: true,
						}),
					],
					[
						new PluginTerminal({
							cmd: 'node ./bin/sparkly.js',
							dark: true,
							autostart: true,
						}),
						new PluginTerminal({
							cmd: 'node ./bin/columnify.js',
							dark: true,
							autostart: true,
						}),
					],
				],
			},
			{
				title: 'client',
				rows: [
					[
						new PluginTerminal({
							cmd: 'node ./bin/example-01.js',
							dark: true,
						}),
					],
				],
			},
		],
	};
}

module.exports = getConfig;
