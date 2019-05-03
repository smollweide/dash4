import fs from 'fs-extra';
import path from 'path';

export interface IPackageJson {
	name?: string;
	version?: string;
	description?: string;
	dependencies?: { [key: string]: string };
	devDependencies?: { [key: string]: string };
	[key: string]: any;
}
export const getScript = (packageData: IPackageJson, scriptName: string) => {
	if (!hasScript(packageData, scriptName)) {
		return;
	}
	return packageData.scripts[scriptName];
};
export const hasScript = (packageData: IPackageJson, scriptName: string) =>
	packageData.scripts && packageData.scripts[scriptName] && packageData.scripts[scriptName] !== '';
export const hasDependency = (packageData: IPackageJson, dependencyName: string) =>
	(packageData.devDependencies && packageData.devDependencies[dependencyName]) ||
	(packageData.dependencies && packageData.dependencies[dependencyName]);

export async function hasFile(...pathFragments: string[]) {
	try {
		return (await fs.stat(path.join(...pathFragments))).isFile();
	} catch (err) {
		return false;
	}
}
