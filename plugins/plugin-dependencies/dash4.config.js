const { PluginDependencies } = require('./build/server');

async function getConfig() {
	return {
		port: 8042,
		tabs: [
			{
				title: 'Root',
				rows: [
					[
						new PluginDependencies({
							lerna: '../../lerna.json',
							installProcess: {
								title: 'run bootstrap',
								cmd: 'npm run bootstrap',
								cwd: '../../',
							},
						}),
					],
				],
			},
		],
	};
}

module.exports = getConfig;
