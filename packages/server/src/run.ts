import program from 'commander';
import fs from 'fs';
import path from 'path';
import { IConfig, TServerRequest } from '.';
import { start as startServer } from './server';

async function getProgram() {
	program
		.version(((await require(path.join(__dirname, '..', 'package.json'))) as any).version)
		.option('-p, --port [number]', 'number of port which should be used')
		.option('-c, --config [string]', 'path to config file')
		.parse((process as any).argv);

	return {
		port: program.port as number | undefined,
		config: path.join(fs.realpathSync(process.cwd()), program.config || 'dash4.config.js'),
	};
}

(async function start() {
	const options = await getProgram();

	const getConfig = ((await require(options.config)) as any) as () => Promise<IConfig>;
	const config = await getConfig();

	config.port = options.port || config.port || 8080;
	const serverRequestListeners: TServerRequest[] = [];

	const { on, send } = await startServer({ port: config.port, serverRequestListeners }, config);

	config.tabs.forEach(({ rows }) => {
		rows.forEach((pluginInstances) => {
			pluginInstances.forEach((pluginInstance) => {
				pluginInstance.connect(on, send);
				if (pluginInstance.serverRequest) {
					serverRequestListeners.push(pluginInstance.serverRequest);
				}
				if (Array.isArray(pluginInstance.serverRequests)) {
					pluginInstance.serverRequests.forEach((serverRequest) =>
						serverRequestListeners.push(serverRequest)
					);
				}
			});
		});
	});
})();
