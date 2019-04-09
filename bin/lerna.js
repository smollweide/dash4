const fs = require('fs-extra');
const path = require('path');
const execa = require('execa');
const globby = require('globby');

const cwd = fs.realpathSync(process.cwd());

async function list() {
	return (await execa('lerna', ['list'], { cwd })).stdout.trim().split('\n');
}

async function configJson() {
	return JSON.parse(await fs.readFile(path.join(cwd, 'lerna.json'), 'utf8'));
}

async function packages() {
	const config = await configJson();
	return await globby(config.packages.map((pathName) => path.join(pathName, 'package.json')), { cwd });
}

async function packageDatas(packages) {
	const infos = [];
	let i = 0;

	for (i = 0; i < packages.length; i += 1) {
		const packageData = await require(path.join(cwd, packages[i]));
		infos.push({
			...packageData,
			_path_: packages[i],
		});
	}

	return infos;
}

module.exports.list = list;
module.exports.configJson = configJson;
module.exports.packages = packages;
module.exports.packageDatas = packageDatas;
