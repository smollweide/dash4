const { PluginReadme, PluginReadmeList } = require('./build/server');

async function getConfig() {
	return {
		tabs: [
			{
				title: 'Root',
				rows: [
					[
						new PluginReadme({
							file: '../../README.md',
							width: [12, 8, 8],
							height: 400,
						}),
					],
					[
						new PluginReadmeList({
							files: [
								{
									title: 'Dash4 - PluginReadme',
									file: '../plugin-readme/README.md',
								},
								{
									title: 'Dash4 - PluginTerminal',
									file: '../plugin-terminal/README.md',
								},
								{
									title: 'Dash4 - PluginNpmScripts',
									file: '../plugin-npm-scripts/README.md',
								},
							],
							width: [12, 8, 8],
						}),
					],
					[
						new PluginReadme({
							file: 'README.md',
						}),
						new PluginReadme({
							file: '../plugin-terminal/README.md',
						}),
						new PluginReadme({
							file: '../plugin-npm-scripts/README.md',
						}),
					],
					[
						new PluginReadmeList({
							title: 'Readme list',
							files: [
								{
									title: 'Dash4',
									file: '../../README.md',
								},
								{
									title: 'Dash4 - PluginTerminal',
									file: '../plugin-terminal/README.md',
								},
								{
									title: 'Dash4 - PluginNpmScripts',
									file: '../plugin-npm-scripts/README.md',
								},
								{
									title: 'Dash4 - PluginReadme',
									file: '../plugin-readme/README.md',
								},
								{
									title: 'Dash4 - Config',
									file: '../../packages/config/README.md',
								},
								{
									title: 'Dash4 - ReactXterm',
									file: '../../packages/react-xterm/README.md',
								},
							],
						}),
					],
				],
			},
		],
	};
}

module.exports = getConfig;
