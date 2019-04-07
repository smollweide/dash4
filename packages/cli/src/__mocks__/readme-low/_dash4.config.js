/**
 *
 * 	DASH4 configuration
 *  https://github.com/smollweide/dash4
 *
 */
// https://github.com/smollweide/dash4/tree/master/plugins/plugin-readme
const { PluginReadme } = require('@dash4/plugin-readme');

async function getConfig() {
	return {
		port: 8080,
		tabs: [
			{
				title: 'Root',
				rows: [[new PluginReadme({ file: 'readme.md' })]],
			},
		],
	};
}

module.exports = getConfig;
