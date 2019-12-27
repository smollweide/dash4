import { TPluginName } from './Config/Config';
import { hasDependency, hasScript, IPackageJson } from './utils';

interface IGetTestConfig {
	usesYarn: boolean;
	packagePath?: string;
	packageData: IPackageJson;
}

export async function getTestConfig({ usesYarn, packagePath, packageData }: IGetTestConfig) {
	const packages: {
		[key: string]: boolean;
	} = {};
	const configs: {
		pluginName: TPluginName;
		options?: any;
	}[] = [];

	const command = usesYarn ? 'yarn' : 'npm run';
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
			cmd: `${command} test`,
			cwd: packagePath,
			allowedCommands: '<DASH4INNER>jestCommands</DASH4INNER>',
		});
		appendPluginCodeCoverage();
		return { packages, configs };
	}

	if (hasWatchTest && hasJest) {
		appendPluginTerminal({
			cmd: `${command} watch-test`,
			cwd: packagePath,
			allowedCommands: '<DASH4INNER>jestCommands</DASH4INNER>',
		});
		appendPluginCodeCoverage();
		return { packages, configs };
	}

	if (hasWatchTest) {
		appendPluginTerminal({
			cmd: `${command} watch-test`,
			cwd: packagePath,
		});
		appendPluginCodeCoverage();
		return { packages, configs };
	}

	appendPluginCodeCoverage();
	return { packages, configs };
}
