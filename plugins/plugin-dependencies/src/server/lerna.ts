/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable global-require */
import fs from 'fs-extra';
import globby from 'globby';
import path from 'path';
import { IPackageJson } from '../shared-types';
import { asyncForEach } from './utils';

export interface ILernaJson {
	lerna?: string;
	packages: string[];
	version?: string;
}

export async function configJson(cwd: string, lerna = 'lerna.json'): Promise<ILernaJson> {
	return JSON.parse(await fs.readFile(path.join(cwd, lerna), 'utf8'));
}

export async function packages(cwd: string, lerna?: string) {
	const config = await configJson(cwd, lerna);
	return await globby(
		config.packages.map((pathName) => path.join(pathName, 'package.json')),
		{ cwd }
	);
}

export interface IDetailed {
	[key: string]: {
		path: string;
		name: string;
		packageData: IPackageJson;
	};
}

export async function detailed(cwd: string, lerna?: string) {
	const packagesPathNames = await packages(cwd, lerna);
	const out: IDetailed = {};
	await asyncForEach(packagesPathNames, async (packagePathName) => {
		const packageData = await require(path.join(cwd, packagePathName));
		out[packagePathName] = {
			path: packagePathName.replace('/package.json', ''),
			name: packageData.name,
			packageData,
		};
	});

	return out;
}
