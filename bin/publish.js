const path = require('path');
const fs = require('fs-extra');
const ora = require('ora');
const lerna = require('./lerna');
const cwd = fs.realpathSync(process.cwd());

async function asyncForEach(array, callback) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

async function publishPackage(pathName, packageName) {
	const spinner = ora(`${packageName}: publishing ...`);
	spinner.start();
	await execa('npm', ['publish', '--access', 'public'], {
		cwd: path.join(cwd, pathName),
	});
	spinner.succeed(`${packageName}: published`);
}

async function publishPackages(packagePathNames, lernaPackageNames) {
	await asyncForEach(packagePathNames, async (packagePathName, index) => {
		await publishPackage(packagePathName, lernaPackageNames[index]);
	});
}

(async () => {
	const lernaPackageNames = await lerna.list();
	const lernaPackageFiles = await lerna.packages();

	// publish packages
	try {
		await publishPackages(
			lernaPackageFiles.map((file) => file.replace(path.basename(file), '')),
			lernaPackageNames
		);
	} catch (err) {
		console.log(err);
		process.exit(1);
		return;
	}
})();
