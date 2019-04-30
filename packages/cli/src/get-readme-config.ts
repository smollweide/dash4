import path from 'path';
import { TPluginName } from './Config/Config';
import { hasFile } from './utils';

interface IGetReadmeConfig {
	packagePath?: string;
	cwd: string;
}

export async function getReadmeConfig({ packagePath, cwd }: IGetReadmeConfig) {
	const packages: {
		[key: string]: boolean;
	} = {};
	const configs: Array<{
		pluginName: TPluginName;
		options?: any;
	}> = [];

	const hasReadmeLow = await hasFile(cwd, 'readme.md');
	const hasReadmeUp = await hasFile(cwd, 'README.md');
	const hasReadme = hasReadmeLow || hasReadmeUp;

	if (!hasReadme) {
		return { packages, configs };
	}

	configs.push({
		pluginName: 'PluginReadme',
		options: {
			file: hasReadmeUp ? path.join(packagePath || '', 'README.md') : path.join(packagePath || '', 'readme.md'),
		},
	});
	packages['@dash4/plugin-readme'] = true;
	return { packages, configs };
}
