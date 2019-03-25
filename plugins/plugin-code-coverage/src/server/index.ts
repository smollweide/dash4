import { Dash4Plugin, IDash4Plugin } from '@dash4/server';
import fs from 'fs-extra';
import makeDir from 'make-dir';
import opn from 'opn';
import path from 'path';
import watch from 'watch';
import { IClientConfig, ICoverage, IThreshold, IThresholdGuaranteed } from '../shared-types';
import { getCoverageFromDom } from './get-coverage-from-dom';
import { htmlToDom } from './html-to-dom';

// import { ITerm, terminalEmulator } from './terminal-emulator';

export interface IOptions {
	// current working directory of the child process.
	cwd?: string;
	// directory of coverage json file (default=coverage/lcov-report/index.html)
	lcovHtmlPath?: string;
	// define threshold level for [error, warning]
	// default:
	// branches: [60, 80];
	// functions: [60, 80];
	// lines: [60, 80];
	// statements: [60, 80];
	threshold?: IThreshold;
	// grid with per breakpoint
	// [12,6,3] means 100% width on small viewports, 50% on medium viewports and 33.3% on large viewports
	width?: number[];
	// enable / disable dark mode
	dark?: boolean;
}

const processCwd = fs.realpathSync(process.cwd());

export class PluginCodeCoverage extends Dash4Plugin implements IDash4Plugin<IClientConfig> {
	private _lcovHtmlPath: string;
	private _cwd: string;
	private _threshold: IThresholdGuaranteed;

	constructor(options: IOptions | undefined = {}) {
		super({
			dark: options.dark,
			width: options.width,
			name: 'PluginCodeCoverage',
			lowerCaseName: 'plugin-code-coverage',
		});

		const { lcovHtmlPath = 'coverage/lcov-report/index.html', threshold = {} } = options;

		this._cwd = options.cwd ? path.join(processCwd, options.cwd) : processCwd;
		this._lcovHtmlPath = path.join(this._cwd, lcovHtmlPath);
		this._threshold = {
			statements: threshold.statements || [60, 80],
			branches: threshold.branches || [60, 80],
			functions: threshold.functions || [60, 80],
			lines: threshold.lines || [60, 80],
		};
	}

	public get clientConfig() {
		return {
			cwd: this._cwd,
			threshold: this._threshold,
		};
	}

	public get clientFiles() {
		return [path.join(__dirname, '../../dist/plugins/plugin-code-coverage/main.js')];
	}

	public connected = () => {
		if (!this.on) {
			return;
		}

		this.watchForChangeCoverage();
		this.on('conntected', async () => {
			this.send('data', await this.fetchCoverage());
		});
		this.on('open-report', this.openReport);
	};

	private openReport = () => {
		opn(this._lcovHtmlPath);
	};

	private watchForChangeCoverage = async () => {
		const dir = path.dirname(this._lcovHtmlPath);
		await makeDir(dir);
		watch.createMonitor(dir, (monitor) => {
			monitor.on('created', this.handleFileChanged);
			monitor.on('changed', this.handleFileChanged);
			monitor.on('removed', this.handleFileChanged);
		});
	};

	private handleFileChanged = async (file: string) => {
		if (file !== this._lcovHtmlPath) {
			return;
		}
		this.send('data', await this.fetchCoverage());
	};

	private fetchCoverage = async (): Promise<ICoverage> => {
		try {
			const lcovReport = await fs.readFile(this._lcovHtmlPath, 'utf8');
			return getCoverageFromDom(await htmlToDom(lcovReport));
		} catch (err) {
			// tslint:disable-next-line
			console.log('Error in fetchCoverage: ', err.toString());
			return {
				error: true,
				message: err.toString(),
			};
		}
	};
}
