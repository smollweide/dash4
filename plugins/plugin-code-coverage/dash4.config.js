const { PluginTerminal } = require('../plugin-terminal');
const { PluginCodeCoverage } = require('./build/server');

async function getConfig() {
	return {
		port: 8041,
		tabs: [
			{
				title: 'Root',
				rows: [
					[new PluginCodeCoverage()],
					[
						new PluginTerminal({
							cmd: 'npm run test-watch:server',
						}),
					],
				],
			},
		],
	};
}

module.exports = getConfig;
