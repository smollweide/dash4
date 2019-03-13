const path = require('path');
const fs = require('fs-extra');
const { PluginNpmScripts } = require('./plugins/plugin-npm-scripts/build/server');
const { PluginTerminal } = require('./plugins/plugin-terminal/build/server');

const getPluginPathes = async () => {
	const cwd = await fs.realpath(process.cwd());
	const pathPlugins = path.join(cwd, 'plugins');
	const pathes = await fs.readdir(pathPlugins);

	return (await Promise.all(
		pathes.map(async (pathPlugin) =>
			(await fs.stat(path.join(pathPlugins, pathPlugin))).isDirectory() ? pathPlugin : undefined
		)
	)).filter((value) => typeof value === 'string');
};

async function getConfig() {
	const pluginTabs = (await getPluginPathes()).map((pluginName) => ({
		title: pluginName,
		rows: [
			[
				new PluginTerminal({
					id: `${pluginName}-1`,
					cmd: 'npm start',
					cwd: path.join('plugins', pluginName),
					autostart: false,
					width: [12, 6, 8],
				}),
				new PluginNpmScripts({
					id: `${pluginName}-2`,
					scripts: [
						{
							title: 'build',
							cmd: 'npm run build',
							cwd: path.join('plugins', pluginName),
						},
						{
							title: 'analyze-bundle-size',
							cmd: 'npm run analyze-bundle-size',
							cwd: path.join('plugins', pluginName),
						},
					],
					width: [12, 6, 4],
				}),
			],
			[
				new PluginTerminal({
					id: `${pluginName}-3`,
					cmd: 'npm run watch-build',
					cwd: path.join('plugins', pluginName),
					autostart: false,
				}),
				new PluginTerminal({
					id: `${pluginName}-4`,
					cmd: 'npm run watch-dist',
					cwd: path.join('plugins', pluginName),
					autostart: false,
				}),
			],
		],
	}));

	return {
		tabs: [
			{
				title: 'Root',
				rows: [
					[
						new PluginNpmScripts({
							id: 'root-1',
							dark: false,
							scripts: [
								{
									title: 'bootstrap',
									cmd: 'npm run bootstrap',
								},
								{
									title: 'lint',
									cmd: 'npm run lint',
								},
								{
									title: 'prettier',
									cmd: 'npm run prettier',
								},
								{
									title: 'build',
									cmd: 'npm run build',
								},
							],
							width: [12, 6, 4],
						}),
					],
				],
			},
			{
				title: 'client',
				rows: [
					[
						new PluginTerminal({
							id: 'client-1',
							cmd: 'npm start',
							cwd: '/packages/client',
							autostart: false,
							width: [12, 6, 8],
						}),
						new PluginNpmScripts({
							id: 'client-2',
							scripts: [
								{
									title: 'build',
									cmd: 'npm run build',
									cwd: '/packages/client',
								},
								{
									title: 'analyze-bundle-size',
									cmd: 'npm run analyze-bundle-size',
									cwd: '/packages/client',
								},
							],
							width: [12, 6, 4],
						}),
					],
					[
						new PluginTerminal({
							id: 'client-3',
							cmd: 'npm run watch-build',
							cwd: '/packages/client',
							autostart: false,
						}),
						new PluginTerminal({
							id: 'client-4',
							cmd: 'npm run watch-dist',
							cwd: '/packages/client',
							autostart: false,
						}),
					],
				],
			},
			{
				title: 'server',
				rows: [
					[
						new PluginTerminal({
							id: 'server-1',
							cmd: 'npm run watch-build',
							cwd: '/packages/server',
							autostart: false,
							width: [12, 6, 8],
						}),
						new PluginNpmScripts({
							id: 'client-3',
							scripts: [
								{
									title: 'build',
									cmd: 'npm run build',
									cwd: '/packages/server',
								},
								{
									title: 'analyze-bundle-size',
									cmd: 'npm run analyze-bundle-size',
									cwd: '/packages/server',
								},
							],
							width: [12, 6, 4],
						}),
					],
				],
			},
		].concat(pluginTabs),
	};
}

module.exports = getConfig;
