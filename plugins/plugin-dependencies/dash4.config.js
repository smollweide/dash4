const { PluginDependencies } = require('./build/server');

async function getConfig() {
	return {
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
