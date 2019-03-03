#!/usr/bin/env node
'use strict';

const path = require('path');
const globby = require('globby');
const { prompt } = require('enquirer');
const latestVersion = require('latest-version');
const ora = require('ora');
const chalk = require('chalk');
const fs = require('./fs');

const cwd = fs.realpathSync(process.cwd());

function appendDependencies(appendTo, packageData, pathName, isDevDependencies) {
	const dependencies = isDevDependencies ? packageData.devDependencies : packageData.dependencies;
	if (!dependencies) {
		return;
	}

	Object.keys(dependencies).forEach((key) => {
		if (!appendTo[key]) {
			appendTo[key] = {
				versions: [],
			};
		}
		if (!appendTo[key].versions.includes(dependencies[key])) {
			appendTo[key].versions.push(dependencies[key]);
		}
		appendTo[key][pathName] = {
			isDev: isDevDependencies,
			version: dependencies[key],
		};
	});
}

function getUpdateValue(name, oldVersion, newVersion) {
	const out = [];
	out.push(chalk.white(name.padEnd(30, ' ')));
	out.push(' ');
	out.push(chalk.red(oldVersion.toString().padStart(8, ' ')));
	out.push(' → ');
	out.push(chalk.green(newVersion.toString().padEnd(8, ' ')));
	return out.join('');
}

async function fetchDependencies() {
	const packageFiles = await globby(
		['**/package.json', '**/package-*.json', '!**/package-lock.json', '!**/node_modules', '!**/__tests__'],
		{
			cwd,
		}
	);
	const dependencies = {};
	let i;

	for (i = 0; i < packageFiles.length; i += 1) {
		const packageData = JSON.parse(await fs.readFile(path.join(cwd, packageFiles[i])));
		appendDependencies(dependencies, packageData, packageFiles[i], false);
		appendDependencies(dependencies, packageData, packageFiles[i], true);
	}

	return dependencies;
}

async function fetchUpdateDependencies(dependencies) {
	let dependenciesKeys = Object.keys(dependencies);
	let i = 0;

	for (i = 0; i < dependenciesKeys.length; i += 1) {
		try {
			dependencies[dependenciesKeys[i]].latestVersion = await latestVersion(dependenciesKeys[i], {
				version: 'latest',
			});
		} catch (err) {
			dependencies[dependenciesKeys[i]].latestVersion = dependencies[dependenciesKeys[i]].versions[0];
		}
	}

	const updateDependencies = {};

	for (i = 0; i < dependenciesKeys.length; i += 1) {
		if (!dependencies[dependenciesKeys[i]].versions.includes(dependencies[dependenciesKeys[i]].latestVersion)) {
			updateDependencies[dependenciesKeys[i]] = dependencies[dependenciesKeys[i]];
		}
	}

	return updateDependencies;
}

async function selectDependencies(updateDependencies) {
	let response;

	try {
		response = await prompt({
			type: 'multiselect',
			name: 'dependencies',
			message: 'Select dependencies for update',
			choices: Object.keys(updateDependencies).map((key) => ({
				message: getUpdateValue(
					key,
					updateDependencies[key].versions[0],
					updateDependencies[key].latestVersion
				),
				value: key,
			})),
			initial: Array.apply(null, new Array(Object.keys(updateDependencies).length)).map((_x, index) => index),
		});
	} catch (err) {
		process.exit(1);
		return;
	}

	return response.dependencies;
}

async function updatePackage({ dependency, pathName, isDevDependency, newVersion }) {
	const packageDataString = await fs.readFile(path.join(cwd, pathName), 'utf8');
	const useTabs = packageDataString.includes('\t');
	const packageData = JSON.parse(packageDataString);

	if (isDevDependency) {
		packageData.devDependencies[dependency] = newVersion;
	} else {
		packageData.dependencies[dependency] = newVersion;
	}
	await fs.writeFile(path.join(cwd, pathName), JSON.stringify(packageData, null, useTabs ? '\t' : 2));
}

(async () => {
	const spinner = ora('Collection package.json files and dependencies').start();
	const dependencies = await fetchDependencies();
	spinner.stop();

	const spinner2 = ora('Fetch latest versions').start();
	const updateDependencies = await fetchUpdateDependencies(dependencies);
	if (Object.keys(updateDependencies).length < 1) {
		spinner2.succeed('No updates available');
		process.exit(1);
		return;
	}
	spinner2.stop();

	const selectedDependencies = await selectDependencies(updateDependencies);
	let i = 0;

	for (i = 0; i < selectedDependencies.length; i += 1) {
		let k = 0;
		const dependencyData = dependencies[selectedDependencies[i]];
		const latestVersion = dependencyData.latestVersion;

		delete dependencyData.versions;
		delete dependencyData.latestVersion;

		const dependencyKeys = Object.keys(dependencyData);

		for (k = 0; k < dependencyKeys.length; k += 1) {
			await updatePackage({
				dependency: selectedDependencies[i],
				pathName: dependencyKeys[k],
				isDevDependency: dependencyData[dependencyKeys[k]].isDev,
				newVersion: latestVersion,
			});
		}
	}
})();
