/**
 *
 * 	DASH4 configuration
 *  https://github.com/smollweide/dash4
 *
 */
// https://github.com/smollweide/dash4/tree/master/plugins/plugin-terminal
const { PluginTerminal } = require('@dash4/plugin-terminal');
// https://github.com/smollweide/dash4/tree/master/plugins/plugin-code-coverage
const { PluginCodeCoverage } = require('@dash4/plugin-code-coverage');

async function getConfig() {
	return {
		port: 8080,
		tabs: [
			{
				title: 'Root',
				rows: [[new PluginTerminal({ cmd: 'npm run watch-test' }), new PluginCodeCoverage()]],
			},
		],
	};
}

module.exports = getConfig;
