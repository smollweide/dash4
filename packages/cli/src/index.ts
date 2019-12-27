import { spinner } from '@dash4/log';
import chalk from 'chalk';
import execa from 'execa';
import fs from 'fs-extra';
import path from 'path';
import readPkg from 'read-pkg';
// eslint-disable-next-line
import { JsonObject } from 'type-fest';
import writePkg from 'write-pkg';
import { Config, TPluginName } from './Config/Config';
import { getLernaPackages } from './get-lerna-packages';
import { getReadmeConfig } from './get-readme-config';
import { getTestConfig } from './get-test-config';
import { getScript, hasFile, hasScript } from './utils';

interface IOptions {
	port: number;
	config: string;
	force?: boolean;
}

interface ICollect {
	cwd: string;
	packagePath?: string;
	lerna?: string;
	parentUsesYarn?: boolean;
}

async function asyncForEach<TITem = any>(array: TITem[], onIt: (item: TITem, index: number, array: TITem[]) => void) {
	for (let index = 0; index < array.length; index++) {
		// eslint-disable-next-line
		await onIt(array[index], index, array);
	}
}

interface IPackages {
	[key: string]: boolean;
}

interface IConfig {
	pluginName: TPluginName;
	options?: any;
}

async function collectTab({ cwd, packagePath, lerna, parentUsesYarn }: ICollect) {
	let packages: IPackages = {};
	let configs: IConfig[] = [];
	const packageData = await readPkg({ cwd, normalize: false });
	const usesYarn =
		parentUsesYarn ||
		(await hasFile(path.join(cwd, 'yarn.lock'))) ||
		(getScript(packageData, 'start') || '').includes('yarn');

	const command = usesYarn ? 'yarn' : 'npm run';

	function append(results: { packages: IPackages; configs: IConfig[] }) {
		packages = {
			...packages,
			...results.packages,
		};
		configs = configs.concat(results.configs);
	}

	const npmScriptsCmds = [
		hasScript(packageData, 'bootstrap') ? `${command} bootstrap` : undefined,
		hasScript(packageData, 'build') ? `${command} build` : undefined,
		hasScript(packageData, 'watch') ? `${command} watch` : undefined,
		hasScript(packageData, 'test') ? `${command} test` : undefined,
		hasScript(packageData, 'lint') ? `${command} lint` : undefined,
		hasScript(packageData, 'clean') ? `${command} clean` : undefined,
		hasScript(packageData, 'flow') ? `${command} flow` : undefined,
		hasScript(packageData, 'compile') ? `${command} compile` : undefined,
		hasScript(packageData, 'format') ? `${command} format` : undefined,
		hasScript(packageData, 'prettier') ? `${command} prettier` : undefined,
		hasScript(packageData, 'coverage') ? `${command} coverage` : undefined,
		hasScript(packageData, 'prepare') ? `${command} prepare` : undefined,
		hasScript(packageData, 'validate') ? `${command} validate` : undefined,
		hasScript(packageData, 'deploy') ? `${command} deploy` : undefined,
		hasScript(packageData, 'docs') ? `${command} docs` : undefined,
		hasScript(packageData, 'build-storybook') ? `${command} build-storybook` : undefined,
	].filter((cmd) => cmd);

	if (!lerna) {
		configs.push({
			pluginName: 'PluginDependencies',
		});
		packages['@dash4/plugin-dependencies'] = true;
	}

	if (lerna && !packagePath) {
		configs.push({
			pluginName: 'PluginDependencies',
			options: {
				lerna,
				installProcess: {
					title: 'run bootstrap',
					cmd: `${command} bootstrap`,
					cwd: '/',
				},
			},
		});
		packages['@dash4/plugin-dependencies'] = true;
	}

	if (hasScript(packageData, 'start')) {
		configs.push({
			pluginName: 'PluginTerminal',
			options: {
				cmd: `${command.replace(' run', '')} start`,
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
				cmd: `${command} storybook`,
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
			usesYarn,
		})
	);

	if (npmScriptsCmds.length > 0) {
		configs.push({
			pluginName: 'PluginNpmScripts',
			options: {
				scripts: npmScriptsCmds.map((cmd) => ({
					title: cmd ? cmd.replace(/^npm run /, '').replace(/^yarn /, '') : '',
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
	const usesYarn =
		(await hasFile(path.join(cwd, 'yarn.lock'))) || (getScript(packageData, 'start') || '').includes('yarn');

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
					parentUsesYarn: usesYarn,
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
	spin.text('add dash4 script');
	packageData.scripts = packageData.scripts || {};
	packageData.scripts.dash4 = 'dash4';
	await writePkg(path.join(cwd, 'package.json'), packageData as JsonObject);

	// write dash.config
	spin.text('create dash4 configuration');
	await fs.writeFile(options.config, config.toString());

	// install dependencies
	spin.text('install dependencies');
	try {
		if (usesYarn) {
			spin.text(`yarn add -D -W ${Object.keys(packages).join(' ')}`);
			await execa('yarn', ['add', '-D', '-W', ...Object.keys(packages)]);
		} else {
			spin.text(`npm i -D ${Object.keys(packages).join(' ')}`);
			await execa('npm', ['i', '-D', ...Object.keys(packages)]);
		}
	} catch (err) {
		spin.fail(`${chalk.bold('Could not install dependencies:')}\n${err}`);
		process.kill(1);
	}

	spin.succeed(`your Dash4 dashboard is installed and ready. Run "${usesYarn ? 'yarn' : 'npm run'} dash4"`);
}
