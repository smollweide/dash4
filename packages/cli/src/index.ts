import { spinner } from '@dash4/log';
import chalk from 'chalk';
import execa from 'execa';
import fs from 'fs-extra';
import path from 'path';
import readPkg from 'read-pkg';
import writePkg from 'write-pkg';
import { Config, TPluginName } from './Config/Config';
import { getLernaPackages } from './get-lerna-packages';

interface IOptions {
	port: number;
	config: string;
	force?: boolean;
}

export async function hasFile(...pathFragments: string[]) {
	try {
		return (await fs.stat(path.join(...pathFragments))).isFile();
	} catch (err) {
		return false;
	}
}

interface ICollect {
	cwd: string;
	packagePath?: string;
}

async function asyncForEach<IITem = any>(
	array: IITem[],
	callback: (item: IITem, index: number, array: IITem[]) => void
) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

async function collectTab({ cwd, packagePath }: ICollect) {
	const packages: {
		[key: string]: boolean;
	} = {};
	const configs: Array<{
		pluginName: TPluginName;
		options?: any;
	}> = [];
	const packageData = await readPkg({
		cwd,
		normalize: false,
	});
	const hasScript = (scriptName: string) =>
		packageData.scripts && packageData.scripts[scriptName] && packageData.scripts[scriptName] !== '';

	const npmScriptsCmds = [
		hasScript('bootstrap') ? 'npm run bootstrap' : undefined,
		hasScript('build') ? 'npm run build' : undefined,
		hasScript('watch') ? 'npm run watch' : undefined,
		hasScript('test') ? 'npm run test' : undefined,
		hasScript('lint') ? 'npm run lint' : undefined,
		hasScript('clean') ? 'npm run clean' : undefined,
		hasScript('flow') ? 'npm run flow' : undefined,
		hasScript('compile') ? 'npm run compile' : undefined,
		hasScript('format') ? 'npm run format' : undefined,
		hasScript('prettier') ? 'npm run prettier' : undefined,
		hasScript('coverage') ? 'npm run coverage' : undefined,
		hasScript('prepare') ? 'npm run prepare' : undefined,
		hasScript('validate') ? 'npm run validate' : undefined,
		hasScript('deploy') ? 'npm run deploy' : undefined,
		hasScript('docs') ? 'npm run docs' : undefined,
		hasScript('build-storybook') ? 'npm run build-storybook' : undefined,
	].filter((cmd) => cmd);

	if (hasScript('start')) {
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

	if (hasScript('storybook')) {
		configs.push({
			pluginName: 'PluginTerminal',
			options: {
				cmd: 'npm run storybook',
				cwd: packagePath,
			},
		});
		packages['@dash4/plugin-terminal'] = true;
	}

	const hasReadmeLow = await hasFile(cwd, 'readme.md');
	const hasReadmeUp = await hasFile(cwd, 'README.md');
	const hasReadme = hasReadmeLow || hasReadmeUp;

	if (hasReadme) {
		configs.push({
			pluginName: 'PluginReadme',
			options: {
				file: hasReadmeUp
					? path.join(packagePath || '', 'README.md')
					: path.join(packagePath || '', 'readme.md'),
			},
		});
		packages['@dash4/plugin-readme'] = true;
	}

	const hasWatchTest = hasScript('watch-test');
	if (hasScript('test') || hasWatchTest) {
		if (hasWatchTest) {
			configs.push({
				pluginName: 'PluginTerminal',
				options: {
					cmd: 'npm run watch-test',
					cwd: packagePath,
				},
			});
			packages['@dash4/plugin-terminal'] = true;
		}
		configs.push({
			pluginName: 'PluginCodeCoverage',
			...(packagePath
				? {
						options: {
							cwd: packagePath,
						},
				  }
				: {}),
		});

		packages['@dash4/plugin-code-coverage'] = true;
	}

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

	const collection = await collectTab({
		cwd,
	});
	packages = {
		...packages,
		...collection.packages,
	};
	collection.configs.forEach((_config) => {
		config.addPlugin('Root', _config.pluginName, _config.options);
	});

	// lerna
	if (await hasFile(cwd, 'lerna.json')) {
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
	await writePkg(path.join(cwd, 'package.json'), packageData);

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
