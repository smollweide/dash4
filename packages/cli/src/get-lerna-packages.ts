import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';

const pGlop = (pattern: string, options: glob.IOptions = {}): Promise<string[]> => {
	return new Promise((resolve, reject) => {
		glob(pattern, options, (err, files) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(files);
		});
	});
};
const exclude = (excludes: string[], packagePath: string) => Boolean(excludes.indexOf(packagePath) < 0);
const include = (includes: string[], packagePath: string) => Boolean(includes.indexOf(packagePath) >= 0);

export interface IOptions {
	include?: string[];
	exclude?: string[];
}

/**
 * Returns all packages and it's path's in you project
 */
export async function getLernaPackages(projectRootDir: string, options?: IOptions): Promise<string[]> {
	const lernaData: { packages: string[] } = JSON.parse(
		await fs.readFile(path.join(projectRootDir, 'lerna.json'), 'utf8')
	);
	const packagesRaw = await Promise.all(
		lernaData.packages.map((packageGlob: string) =>
			pGlop(packageGlob, {
				cwd: projectRootDir,
			})
		)
	);
	const isValidPackagePath = async (packagePath: string) =>
		(await fs.stat(path.join(projectRootDir, packagePath, 'package.json'))).isFile();
	const packages = packagesRaw.reduce((a, b) => [...a, ...b]);
	if (options && options.include) {
		return packages.filter(isValidPackagePath).filter(include.bind(null, options.include));
	}
	if (options && options.exclude) {
		return packages.filter(isValidPackagePath).filter(exclude.bind(null, options.exclude));
	}
	return packages.filter(isValidPackagePath);
}
