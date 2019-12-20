const path = require('path');
const fs = require('fs-extra');
const { PluginNpmScripts } = require('./plugins/plugin-npm-scripts');
const { PluginTerminal, jestCommands } = require('./plugins/plugin-terminal');
const { PluginReadme } = require('./plugins/plugin-readme');
const { PluginCodeCoverage } = require('./plugins/plugin-code-coverage');
const { PluginDependencies } = require('./plugins/plugin-dependencies');

const getPluginPathes = async () => {
	const cwd = await fs.realpath(process.cwd());
	const pathPlugins = path.join(cwd, 'plugins');
	const pathes = await fs.readdir(pathPlugins);

	return (
		await Promise.all(
			pathes.map(async (pathPlugin) =>
				(await fs.stat(path.join(pathPlugins, pathPlugin))).isDirectory() ? pathPlugin : undefined
			)
		)
	).filter((value) => typeof value === 'string');
};

const pluginTabs = async () => {
	return (await getPluginPathes()).map((pluginName) => ({
		title: pluginName,
		rows: [
			[
				new PluginReadme({
					file: path.join('plugins', pluginName, 'README.md'),
					width: [12, 6, 8],
					height: 400,
				}),
				new PluginNpmScripts({
					scripts: [
						{
							title: 'build',
							cmd: 'npm run build',
							cwd: path.join('plugins', pluginName),
						},
						{
							title: 'run client-side tests',
							cmd: 'npm run test:client',
							cwd: path.join('plugins', pluginName),
						},
						{
							title: 'run server-side tests',
							cmd: 'npm run test:server',
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
					cmd: 'npm run watch-build',
					cwd: path.join('plugins', pluginName),
					autostart: false,
				}),
				new PluginTerminal({
					cmd: 'npm run watch-dist',
					cwd: path.join('plugins', pluginName),
					autostart: false,
				}),
			],
			[
				new PluginTerminal({
					cmd: 'npm start',
					cwd: path.join('plugins', pluginName),
					autostart: false,
				}),
			],
			[
				new PluginTerminal({
					cmd: 'npm run watch-test-client',
					cwd: path.join('plugins', pluginName),
					autostart: false,
					allowedCommands: jestCommands,
				}),
				new PluginCodeCoverage({
					title: 'Client-side code coverage',
					cwd: path.join('plugins', pluginName),
				}),
			],
			[
				new PluginTerminal({
					cmd: 'npm run watch-test-server',
					cwd: path.join('plugins', pluginName),
					autostart: false,
					allowedCommands: jestCommands,
				}),
				new PluginCodeCoverage({
					title: 'Server-side code coverage',
					cwd: path.join('plugins', pluginName),
					lcovHtmlPath: 'coverage-server/lcov-report/index.html',
				}),
			],
		],
	}));
};

async function getConfig() {
	return {
		tabs: [
			{
				title: 'root',
				rows: [
					[
						new PluginReadme({
							file: 'README.md',
							width: [12, 6, 8],
							height: 400,
						}),
						new PluginNpmScripts({
							dark: false,
							scripts: [
								{
									title: 'bootstrap',
									cmd: 'npm run bootstrap',
								},
								{
									title: 'test',
									cmd: 'npm run test',
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
									title: 'sort-package-json',
									cmd: 'npm run sort-package-json',
								},
								{
									title: 'build',
									cmd: 'npm run build',
								},
								{
									title: 'audit',
									cmd: 'npm run audit',
								},
								{
									title: 'audit-fix',
									cmd: 'npm audit fix',
								},
								{
									title: 'git: reset last commit',
									cmd: 'git reset HEAD~1',
								},
							],
							width: [12, 6, 4],
						}),
					],
					[
						new PluginDependencies({
							lerna: 'lerna.json',
							installProcess: {
								title: 'run bootstrap',
								cmd: 'npm run bootstrap',
							},
						}),
					],
				],
			},
			{
				title: 'cli',
				rows: [
					[
						new PluginReadme({
							file: '/packages/cli/README.md',
							width: [12, 6, 8],
							height: 400,
						}),
						new PluginNpmScripts({
							scripts: [
								{
									title: 'build',
									cmd: 'npm run build',
									cwd: '/packages/cli',
								},
								{
									title: 'test',
									cmd: 'npm run test',
									cwd: '/packages/cli',
								},
								{
									title: 'update snapshots',
									cmd: 'npm run test-update-snapshots:server',
									cwd: '/packages/cli',
								},
							],
							width: [12, 6, 4],
						}),
					],
					[
						new PluginTerminal({
							cmd: 'npm run watch-build',
							cwd: '/packages/cli',
							autostart: false,
							width: [12, 6, 8],
						}),
					],
					[
						new PluginTerminal({
							cmd: 'npm run watch-test',
							cwd: '/packages/cli',
							autostart: false,
							allowedCommands: jestCommands,
						}),
						new PluginCodeCoverage({
							cwd: '/packages/cli',
							lcovHtmlPath: 'coverage-server/lcov-report/index.html',
						}),
					],
				],
			},
			{
				title: 'client',
				rows: [
					[
						new PluginReadme({
							file: '/packages/client/README.md',
							width: [12, 6, 8],
							height: 400,
						}),
						new PluginNpmScripts({
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
							cmd: 'npm start',
							cwd: '/packages/client',
							autostart: false,
						}),
						new PluginTerminal({
							cmd: 'npm run watch-build',
							cwd: '/packages/client',
							autostart: false,
							allowedCommands: jestCommands,
						}),
						new PluginTerminal({
							cmd: 'npm run watch-dist',
							cwd: '/packages/client',
							autostart: false,
							allowedCommands: jestCommands,
						}),
					],
				],
			},
			{
				title: 'server',
				rows: [
					[
						new PluginReadme({
							file: '/packages/server/README.md',
							width: [12, 6, 8],
							height: 400,
						}),
						new PluginNpmScripts({
							scripts: [
								{
									title: 'build',
									cmd: 'npm run build',
									cwd: '/packages/server',
								},
							],
							width: [12, 6, 4],
						}),
					],
					[
						new PluginTerminal({
							cmd: 'npm run watch-build',
							cwd: '/packages/server',
							autostart: false,
							width: [12, 6, 6],
						}),
					],
				],
			},
			{
				title: 'ui',
				rows: [
					[
						new PluginReadme({
							file: '/packages/ui/README.md',
							width: [12, 6, 8],
							height: 400,
						}),
						new PluginNpmScripts({
							scripts: [
								{
									title: 'test',
									cmd: 'npm run test',
									cwd: '/packages/ui',
								},
								{
									title: 'test-update-snapshots',
									cmd: 'npm run test-update-snapshots',
									cwd: '/packages/ui',
								},
								{
									title: 'build',
									cmd: 'npm run build',
									cwd: '/packages/ui',
								},
								{
									title: 'build storybook',
									cmd: 'npm run build-storybook',
									cwd: '/packages/ui',
								},
								{
									title: 'analyze-bundle-size',
									cmd: 'npm run analyze-bundle-size',
									cwd: '/packages/ui',
								},
							],
							width: [12, 6, 4],
						}),
					],
					[
						new PluginTerminal({
							cmd: 'npm start',
							cwd: '/packages/ui',
							autostart: false,
						}),
						new PluginTerminal({
							cmd: 'npm run watch-build',
							cwd: '/packages/ui',
							autostart: false,
						}),
					],
					[
						new PluginTerminal({
							cmd: 'npm run watch-test',
							cwd: '/packages/ui',
							autostart: false,
							allowedCommands: jestCommands,
						}),
						new PluginCodeCoverage({
							cwd: '/packages/ui',
						}),
					],
				],
			},
			{
				title: 'react-xterm',
				rows: [
					[
						new PluginReadme({
							file: '/packages/react-xterm/README.md',
							width: [12, 6, 8],
							height: 400,
						}),
						new PluginNpmScripts({
							scripts: [
								{
									title: 'build',
									cmd: 'npm run build',
									cwd: '/packages/react-xterm',
								},
								{
									title: 'analyze-bundle-size',
									cmd: 'npm run analyze-bundle-size',
									cwd: '/packages/react-xterm',
								},
							],
							width: [12, 6, 4],
						}),
					],
					[
						new PluginTerminal({
							cmd: 'npm run start',
							cwd: '/packages/react-xterm',
							autostart: false,
							width: [12, 6, 6],
						}),
					],
				],
			},
			{
				title: 'terminal-emulator',
				rows: [
					[
						new PluginReadme({
							file: '/packages/terminal-emulator/README.md',
							width: [12, 6, 8],
							height: 400,
						}),
						new PluginNpmScripts({
							scripts: [
								{
									title: 'test',
									cmd: 'npm run test',
									cwd: '/packages/terminal-emulator',
								},
								{
									title: 'build',
									cmd: 'npm run build',
									cwd: '/packages/terminal-emulator',
								},
							],
							width: [12, 6, 4],
						}),
					],
					[
						new PluginTerminal({
							cmd: 'npm run watch-build',
							cwd: '/packages/terminal-emulator',
							autostart: false,
							width: [12, 6, 6],
						}),
					],
					[
						new PluginTerminal({
							cmd: 'npm run watch-test',
							cwd: '/packages/terminal-emulator',
							autostart: false,
							allowedCommands: jestCommands,
						}),
						new PluginCodeCoverage({
							cwd: '/packages/terminal-emulator',
							lcovHtmlPath: 'coverage-server/lcov-report/index.html',
						}),
					],
				],
			},
			{
				title: 'log',
				rows: [
					[
						new PluginReadme({
							file: '/packages/log/README.md',
							width: [12, 6, 8],
							height: 400,
						}),
						new PluginNpmScripts({
							scripts: [
								{
									title: 'test',
									cmd: 'npm run test',
									cwd: '/packages/log',
								},
								{
									title: 'build',
									cmd: 'npm run build',
									cwd: '/packages/log',
								},
							],
							width: [12, 6, 4],
						}),
					],
					[
						new PluginTerminal({
							cmd: 'npm start',
							cwd: '/packages/log',
							autostart: false,
						}),
						new PluginTerminal({
							cmd: 'npm run watch-build',
							cwd: '/packages/log',
							autostart: false,
						}),
					],
					[
						new PluginTerminal({
							cmd: 'npm run watch-test',
							cwd: '/packages/log',
							autostart: false,
							allowedCommands: jestCommands,
						}),
						new PluginCodeCoverage({
							cwd: '/packages/log',
							lcovHtmlPath: 'coverage-server/lcov-report/index.html',
						}),
					],
				],
			},
		].concat(await pluginTabs()),
	};
}

module.exports = getConfig;
