import program from 'commander';
import fs from 'fs';
import path from 'path';
import { start as startServer } from './server';

export type TOn = (id: string, callback: any) => void;
export type TSend = (id: string, data?: any) => void;

export interface IPlugin<IAdditionals = {}> {
	id: string;
	name: string;
	lowerCaseName: string;
	clientFiles: string[];
	dark?: boolean;
	additionals: IAdditionals;
	connect: (on: TOn, send: TSend) => void;
}

export interface IConfigTab {
	title: string;
	rows: IPlugin[][];
}

export interface IConfig {
	port?: number;
	tabs: IConfigTab[];
}

// tslint:disable-next-line
const log = console.log;

async function getProgram() {
	program
		.version(await require(path.join(__dirname, '..', 'package.json')).version)
		.option('-c, --config [string]', 'path to config file')
		.parse(process.argv);

	return {
		config: path.join(fs.realpathSync(process.cwd()), program.config || 'dash4.config.js'),
	};
}

(async function start() {
	const options = await getProgram();

	const getConfig = (await require(options.config)) as () => Promise<IConfig>;
	const config = await getConfig();
	const { on, send } = await startServer({ port: config.port || 8080 }, config);

	config.tabs.forEach(({ rows }) => {
		rows.forEach((pluginInstances) => {
			pluginInstances.forEach((pluginInstance) => {
				pluginInstance.connect(on, send);
			});
		});
	});
})();
