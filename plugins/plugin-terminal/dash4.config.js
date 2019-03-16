const { PluginTerminal } = require('./build/server');

async function getConfig() {
	return {
		tabs: [
			{
				title: 'Root',
				rows: [
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
