const { PluginNpmScripts } = require('./build/server');

async function getConfig() {
	return {
		tabs: [
			{
				title: 'Root',
				rows: [
					[
						new PluginNpmScripts({
							id: '1',
							dark: true,
							scripts: [
								{
									title: 'chalk',
									cmd: 'node chalk.js',
									cwd: './bin',
								},
								{
									title: 'ora',
									cmd: 'node ./bin/ora.js',
								},
								{
									title: 'sparkly',
									cmd: 'node ./bin/sparkly.js',
								},
								{
									title: 'example-01',
									cmd: 'node ./bin/example-01.js',
								},
								{
									cmd: 'node ./bin/columnify.js',
									buttonVariant: 'outline-secondary',
								},
							],
						}),
					],
					[
						new PluginNpmScripts({
							id: '2',
							dark: false,
							scripts: [
								{
									title: 'chalk',
									cmd: 'node ./bin/chalk.js',
								},
								{
									title: 'ora',
									cmd: 'node ./bin/ora.js',
								},
								{
									title: 'sparkly',
									cmd: 'node ./bin/sparkly.js',
								},
								{
									cmd: 'node ./bin/columnify.js',
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
