/**
 *
 * 	DASH4 configuration
 *  https://github.com/smollweide/dash4
 *
 */
// https://github.com/smollweide/dash4/tree/master/plugins/plugin-code-coverage
const { PluginCodeCoverage } = require('@dash4/plugin-code-coverage');
// https://github.com/smollweide/dash4/tree/master/plugins/plugin-npm-scripts
const { PluginNpmScripts } = require('@dash4/plugin-npm-scripts');

async function getConfig() {
	return {
		port: 8080,
		tabs: [
			{
				title: 'Root',
				rows: [
					[
						new PluginCodeCoverage(),
						new PluginNpmScripts({ scripts: [{ title: 'test', cmd: 'npm run test' }] }),
					],
				],
			},
		],
	};
}

module.exports = getConfig;
