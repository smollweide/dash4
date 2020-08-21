/* eslint-disable @typescript-eslint/naming-convention */
import { error, warn } from '@dash4/log';
import { PluginNpmScript } from '@dash4/plugin-npm-scripts/build/server/plugin-npm-script';
import { Dash4Plugin, IDash4Plugin, TOn, TSend } from '@dash4/server';
import fs from 'fs-extra';
import path from 'path';
import readPkg from 'read-pkg';
import {
	IClientConfig,
	IDependencyObj,
	IError,
	IInstallProcess,
	IInstallProcessPrepared,
	IPackageJson,
	IRecieveFromClientCb,
	IRecieveFromClientEventNames,
	ISendToClientData,
	ISendToClientEventNames,
} from '../shared-types';
import { isVersionUpToDate } from './is-version-up-to-date';
import { getLatestVersion } from './latest-version';
import { detailed as getDetailedLernaPackages } from './lerna';
import { updateDependencyInPackage } from './update-dependency-in-package';
import { asyncForEach } from './utils';

export interface IOptions {
	// custom title (default=Code coverage)
	title?: string;
	// current working directory of the child process.
	cwd?: string;
	// grid with per breakpoint
	// [12,6,3] means 100% width on small viewports, 50% on medium viewports and 33.3% on large viewports
	width?: number[];
	// enable / disable dark mode
	dark?: boolean;
	// define install process
	installProcess?: IInstallProcess;
	// path to lerna.json mode which will collect all dependencies in the project
	lerna?: string;
	// exlude dependencies by their dependencyName
	exclude?: RegExp[];
}

const processCwd = fs.realpathSync(process.cwd());

function isError(value: IPackageJson | IError): value is IError {
	return typeof value === 'object' && Object.keys(value).includes('error');
}

async function fetchPackageJson(cwd: string): Promise<IError | IPackageJson> {
	try {
		return (await readPkg({
			cwd,
			normalize: false,
		})) as IPackageJson;
	} catch (err) {
		// eslint-disable-next-line
		error('plugin-dependencies', `error in fetchPackageJson (${cwd}): `, err.toString());
		return {
			error: true,
			message: err.toString(),
		};
	}
}

export class PluginDependencies
	extends Dash4Plugin<IRecieveFromClientEventNames, IRecieveFromClientCb, ISendToClientEventNames, ISendToClientData>
	implements IDash4Plugin<IClientConfig> {
	private _title?: string;
	private _cwd: string;
	private _npmScriptInstance: PluginNpmScript;
	private _installProcess: IInstallProcessPrepared;
	private _foundDependencies: IDependencyObj = {};
	private _lerna?: string;
	private _packages: { path: string; name: string }[] = [];
	private _exclude: RegExp[] = [];
	private _isProcessing = false;

	public constructor(options: IOptions | undefined = {}) {
		super({
			dark: options.dark,
			width: options.width,
			name: 'PluginDependencies',
			lowerCaseName: 'plugin-dependencies',
		});

		this._cwd = options.cwd ? path.join(processCwd, options.cwd) : processCwd;
		this._lerna = options.lerna;
		this._title = options.title;
		this._installProcess = {
			id: this.id,
			title: (options.installProcess || {}).title || 'npm run install',
			cwd: (options.installProcess || {}).cwd || processCwd,
			cmd: (options.installProcess || {}).cmd || 'npm run install',
		};
		this._npmScriptInstance = new PluginNpmScript({
			id: this.id,
			script: this._installProcess,
		});
		this._packages.push({
			path: './',
			name: 'root',
		});
		this._exclude = options.exclude ? options.exclude : [];
	}

	public get clientConfig() {
		return {
			title: this._title,
			cwd: this._cwd,
			installProcess: this._installProcess,
		};
	}

	public get clientFiles() {
		return [path.join(__dirname, '../../dist/plugins/plugin-dependencies/main.js')];
	}

	public connected = async (on: TOn, send: TSend) => {
		this._npmScriptInstance.connect(on, send);

		await this.fetchLernaPackages();
		this.watchForChangePackageJson();
		this.on('connected', this.handleConnected);
		this.on('update', this.handleUpdateDependency);
	};

	private fetchLernaPackages = async () => {
		if (!this._lerna) {
			return;
		}
		const cwd = path.join(this._cwd, path.dirname(this._lerna));
		try {
			const detailed = await getDetailedLernaPackages(cwd, path.basename(this._lerna));
			Object.keys(detailed).forEach((key) => {
				const item = detailed[key];
				this._packages.push({
					name: item.name,
					path: item.path,
				});
				this._exclude.push(new RegExp(`^${item.name}`));
			});
		} catch (err) {
			warn('plugin-dependencies', 'error in fetchLernaPackages: ', err.toString());
		}
	};

	private handleConnected = async () => {
		await this.getAllDependencies();
		this.send('data', this._foundDependencies);
	};

	private getCurrentVersion = (dependencyName: string): string | undefined => {
		try {
			return this._foundDependencies[dependencyName].version;
		} catch (err) {
			// eslint-disable-next-line
		}
		return;
	};

	private handleUpdateDependency = async (dependencyName: string) => {
		this._isProcessing = true;

		const version = await getLatestVersion(dependencyName, this.getCurrentVersion(dependencyName));

		if (!version) {
			await this.getAllDependencies();
			this.send('data', this._foundDependencies);
			this._isProcessing = false;
			return;
		}

		await asyncForEach(this._packages, async (item) => {
			const pkgPath = path.join(this.getPkgBasePath(item.path), 'package.json');
			const pkg = JSON.parse(await fs.readFile(pkgPath, 'utf8'));

			await fs.writeFile(
				pkgPath,
				JSON.stringify(updateDependencyInPackage(pkg, dependencyName, version), null, 2)
			);
		});

		await this.getAllDependencies();
		this.send('data', this._foundDependencies);

		this._isProcessing = false;
	};

	private handleFileChanged = async () => {
		if (this._isProcessing) {
			return;
		}
		await this.getAllDependencies();
		this.send('data', this._foundDependencies);
	};

	private getPkgBasePath = (pathName: string) =>
		this._lerna ? path.join(this._cwd, path.dirname(this._lerna), pathName) : path.join(this._cwd, pathName);

	private watchForChangePackageJson = async () => {
		this._packages.forEach((item) => {
			const pkgPath = this.getPkgBasePath(item.path);
			fs.watch(path.join(pkgPath, 'package.json'), this.handleFileChanged);
		});
	};

	private getAllDependencies = async () => {
		this._foundDependencies = {};
		const foundDependencies = {};
		await asyncForEach(this._packages, async (pkg) => {
			await this.getDependencies(foundDependencies, pkg.path, pkg.name);
		});
		this._foundDependencies = await this.getDependencyObj(foundDependencies);
	};

	private getDependencies = async (
		foundDependencies: {
			[key: string]: {
				version: string;
				pathes: string[];
				packages: string[];
			};
		},
		pathName: string,
		name: string
	) => {
		const pkgPath = this.getPkgBasePath(pathName);
		const packageData = await fetchPackageJson(pkgPath);

		if (isError(packageData)) {
			return;
		}

		['dependencies', 'devDependencies'].forEach((key) => {
			if (!packageData[key]) {
				return;
			}
			Object.keys(packageData[key]).forEach((dependencyName) => {
				if (this._exclude.map((reg) => reg.test(dependencyName)).filter((result) => result).length) {
					return;
				}
				if (!foundDependencies[dependencyName]) {
					foundDependencies[dependencyName] = {
						version: packageData[key][dependencyName],
						pathes: [],
						packages: [],
					};
				}
				foundDependencies[dependencyName].pathes.push(pathName);
				foundDependencies[dependencyName].packages.push(name);
			});
		});
	};

	private getDependencyObj = async (foundDependencies: {
		[key: string]: {
			version: string;
			pathes: string[];
			packages: string[];
		};
	}): Promise<IDependencyObj> => {
		const out = {};
		await Promise.all(
			Object.keys(foundDependencies).map(async (dependencyName) => {
				out[dependencyName] = {
					...foundDependencies[dependencyName],
					...(await this.getDependencyLatestVersion(
						dependencyName,
						foundDependencies[dependencyName].version
					)),
				};
			})
		);
		return out;
	};

	private getDependencyLatestVersion = async (dependencyName: string, version: string) => {
		const latestVersion = await getLatestVersion(dependencyName, version);
		return {
			latestVersion,
			isUpToDate: isVersionUpToDate(version, latestVersion),
		};
	};
}
