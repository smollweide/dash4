import { IPackageJson } from '../shared-types';

export function updateDependencyInPackage(packageData: IPackageJson, dependencyName: string, newVersion: string) {
	if (packageData.dependencies && packageData.dependencies[dependencyName]) {
		packageData.dependencies[dependencyName] = newVersion;
	}

	if (packageData.devDependencies && packageData.devDependencies[dependencyName]) {
		packageData.devDependencies[dependencyName] = newVersion;
	}

	return packageData;
}
