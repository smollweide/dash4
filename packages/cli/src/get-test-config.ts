import { TPluginName } from './Config/Config';
import { hasDependency, hasScript, IPackageJson } from './utils';

interface IGetTestConfig {
	packagePath?: string;
	packageData: IPackageJson;
}

export async function getTestConfig({ packagePath, packageData }: IGetTestConfig) {
	const packages: {
		[key: string]: boolean;
	} = {};
	const configs: Array<{
		pluginName: TPluginName;
		options?: any;
	}> = [];

	const hasTest = hasScript(packageData, 'test');
	const hasWatchTest = hasScript(packageData, 'watch-test');
	const hasJest = hasDependency(packageData, 'jest');
	const isCra = hasDependency(packageData, 'react-scripts') && hasTest;

	function appendPluginTerminal(options: { cmd: string; cwd?: string; allowedCommands?: string }) {
		configs.push({
			pluginName: 'PluginTerminal',
			options,
		});
		packages['@dash4/plugin-terminal'] = true;
	}

	function appendPluginCodeCoverage() {
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

	if (!hasTest && !hasWatchTest) {
		return { packages, configs };
	}

	if (isCra) {
		appendPluginTerminal({
			cmd: 'npm run test',
			cwd: packagePath,
			allowedCommands: '<DASH4INNER>jestCommands</DASH4INNER>',
		});
		appendPluginCodeCoverage();
		return { packages, configs };
	}

	if (hasWatchTest && hasJest) {
		appendPluginTerminal({
			cmd: 'npm run watch-test',
			cwd: packagePath,
			allowedCommands: '<DASH4INNER>jestCommands</DASH4INNER>',
		});
		appendPluginCodeCoverage();
		return { packages, configs };
	}

	if (hasWatchTest) {
		appendPluginTerminal({
			cmd: 'npm run watch-test',
			cwd: packagePath,
		});
		appendPluginCodeCoverage();
		return { packages, configs };
	}

	appendPluginCodeCoverage();
	return { packages, configs };
}
