const { PluginTerminal } = require('./build/server');

async function getConfig() {
	return {
		tabs: [
			{
				title: 'Root',
				rows: [
					[
						new PluginTerminal({
							id: '1',
							cmd: 'node ./bin/chalk.js',
							dark: true,
							autostart: true,
						}),
						new PluginTerminal({
							id: '2',
							cmd: 'node ./bin/ora.js',
							dark: true,
							autostart: true,
						}),
					],
					[
						new PluginTerminal({
							id: '3',
							cmd: 'node ./bin/sparkly.js',
							dark: true,
							autostart: true,
						}),
						new PluginTerminal({
							id: '4',
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
							id: '7',
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
