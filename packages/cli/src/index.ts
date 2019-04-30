import { spinner } from '@dash4/log';
import chalk from 'chalk';
import execa from 'execa';
import fs from 'fs-extra';
import path from 'path';
import readPkg from 'read-pkg';
import { JsonObject } from 'type-fest';
import writePkg from 'write-pkg';
import { Config, TPluginName } from './Config/Config';
import { getLernaPackages } from './get-lerna-packages';
import { getReadmeConfig } from './get-readme-config';
import { getTestConfig } from './get-test-config';
import { hasFile, hasScript } from './utils';

interface IOptions {
	port: number;
	config: string;
	force?: boolean;
}

interface ICollect {
	cwd: string;
	packagePath?: string;
	lerna?: string;
}

async function asyncForEach<IITem = any>(
	array: IITem[],
	callback: (item: IITem, index: number, array: IITem[]) => void
) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

interface IPackages {
	[key: string]: boolean;
}

interface IConfig {
	pluginName: TPluginName;
	options?: any;
}

async function collectTab({ cwd, packagePath, lerna }: ICollect) {
	let packages: IPackages = {};
	let configs: IConfig[] = [];
	const packageData = await readPkg({
		cwd,
		normalize: false,
	});

	function append(results: { packages: IPackages; configs: IConfig[] }) {
		packages = {
			...packages,
			...results.packages,
		};
		configs = configs.concat(results.configs);
	}

	const npmScriptsCmds = [
		hasScript(packageData, 'bootstrap') ? 'npm run bootstrap' : undefined,
		hasScript(packageData, 'build') ? 'npm run build' : undefined,
		hasScript(packageData, 'watch') ? 'npm run watch' : undefined,
		hasScript(packageData, 'test') ? 'npm run test' : undefined,
		hasScript(packageData, 'lint') ? 'npm run lint' : undefined,
		hasScript(packageData, 'clean') ? 'npm run clean' : undefined,
		hasScript(packageData, 'flow') ? 'npm run flow' : undefined,
		hasScript(packageData, 'compile') ? 'npm run compile' : undefined,
		hasScript(packageData, 'format') ? 'npm run format' : undefined,
		hasScript(packageData, 'prettier') ? 'npm run prettier' : undefined,
		hasScript(packageData, 'coverage') ? 'npm run coverage' : undefined,
		hasScript(packageData, 'prepare') ? 'npm run prepare' : undefined,
		hasScript(packageData, 'validate') ? 'npm run validate' : undefined,
		hasScript(packageData, 'deploy') ? 'npm run deploy' : undefined,
		hasScript(packageData, 'docs') ? 'npm run docs' : undefined,
		hasScript(packageData, 'build-storybook') ? 'npm run build-storybook' : undefined,
	].filter((cmd) => cmd);

	if (!lerna) {
		configs.push({
			pluginName: 'PluginDependencies',
		});
	}

	if (lerna && !packagePath) {
		configs.push({
			pluginName: 'PluginDependencies',
			options: {
				lerna,
				installProcess: {
					title: 'run bootstrap',
					cmd: 'npm run bootstrap',
					cwd: '/',
				},
			},
		});
	}

	if (hasScript(packageData, 'start')) {
		configs.push({
			pluginName: 'PluginTerminal',
			options: {
				cmd: 'npm start',
				cwd: packagePath,
				autostart: true,
			},
		});
		packages['@dash4/plugin-terminal'] = true;
	}

	if (hasScript(packageData, 'storybook')) {
		configs.push({
			pluginName: 'PluginTerminal',
			options: {
				cmd: 'npm run storybook',
				cwd: packagePath,
			},
		});
		packages['@dash4/plugin-terminal'] = true;
	}

	append(
		await getReadmeConfig({
			packagePath,
			cwd,
		})
	);

	append(
		await getTestConfig({
			packagePath,
			packageData,
		})
	);

	if (npmScriptsCmds.length > 0) {
		configs.push({
			pluginName: 'PluginNpmScripts',
			options: {
				scripts: npmScriptsCmds.map((cmd) => ({
					title: cmd ? cmd.replace(/^npm run /, '') : '',
					cmd,
					cwd: packagePath,
				})),
			},
		});
		packages['@dash4/plugin-npm-scripts'] = true;
	}

	return { packages, configs };
}

export async function init(cwd: string, options: IOptions) {
	const spin = spinner('cli', 'Collect required changes');
	spin.start();

	if (!(await hasFile(cwd, 'package.json'))) {
		spin.fail('package.json not found!');
		process.kill(1);
		return;
	}

	if ((await hasFile(options.config)) && !options.force) {
		spin.fail('Dash4 is already installed!');
		process.kill(1);
		return;
	}

	const config = new Config({ port: options.port });
	let packages = { '@dash4/server': true };
	const packageData = await readPkg({ cwd, normalize: false });
	const isLerna = await hasFile(cwd, 'lerna.json');

	const collection = await collectTab({
		cwd,
		lerna: isLerna ? path.join('lerna.json') : undefined,
	});
	packages = {
		...packages,
		...collection.packages,
	};
	collection.configs.forEach((_config) => {
		config.addPlugin('Root', _config.pluginName, _config.options);
	});

	// lerna
	if (isLerna) {
		spin.text('collect changes for lerna monorepository');
		const lernaPackages = await getLernaPackages(cwd);
		asyncForEach(lernaPackages, async (lernaPackage) => {
			try {
				const tabName: string =
					(await fs.readJSON(path.join(cwd, lernaPackage, 'package.json'))).name ||
					path.basename(lernaPackage);
				const _collection = await collectTab({
					cwd: path.join(cwd, lernaPackage),
					packagePath: lernaPackage,
					lerna: path.join('lerna.json'),
				});
				packages = {
					...packages,
					..._collection.packages,
				};
				_collection.configs.forEach((_config) => {
					config.addPlugin(tabName, _config.pluginName, _config.options);
				});
			} catch (err) {
				return;
			}
		});
	}

	// add npm scripts
	spin.text('add dash4 npm script');
	packageData.scripts = packageData.scripts || {};
	packageData.scripts.dash4 = 'dash4';
	await writePkg(path.join(cwd, 'package.json'), packageData as JsonObject);

	// write dash.config
	spin.text('create dash4 configuration');
	await fs.writeFile(options.config, config.toString());

	// install dependencies
	spin.text('install dependencies');
	try {
		await execa('npm', ['i', '-D', ...Object.keys(packages)]);
	} catch (err) {
		spin.fail(`${chalk.bold('Could not install dependencies:')}\n${err}`);
		process.kill(1);
	}

	spin.succeed('your Dash4 dashboard is installed and ready. Run "npm run dash4"');
}
