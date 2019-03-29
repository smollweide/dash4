import { Dash4Plugin, IDash4Plugin } from '@dash4/server';
import fs from 'fs';
import path from 'path';
import { IClientConfig } from '../shared-types';
import { ITerm, terminalEmulator } from './terminal-emulator';

export interface IOptions {
	// command which should be executed
	cmd: string;
	// current working directory of the child process.
	cwd?: string;
	// enable/disable dark mode
	dark?: boolean;
	// the given command will be executed on start
	autostart?: boolean;
	// grid with per breakpoint
	// [12,6,3] means 100% width on small viewports, 50% on medium viewports and 33.3% on large viewports
	width?: number[];
}

const processCwd = fs.realpathSync(process.cwd());

export class PluginTerminal extends Dash4Plugin implements IDash4Plugin<IClientConfig> {
	private _cmd: string;
	private _cwd: string;
	private _terminalLog: string = '';
	private _autostart: boolean;
	private _term: ITerm;
	private _stopProcessingTriggered: boolean = false;

	constructor({ dark = true, width, cmd, cwd, autostart = false }: IOptions) {
		super({
			dark,
			width,
			name: 'PluginTerminal',
			lowerCaseName: 'plugin-terminal',
		});

		this._cmd = cmd;
		this._cwd = cwd ? path.join(processCwd, cwd) : processCwd;
		this._autostart = autostart;

		this.create();

		if (this._autostart) {
			this.start();
		}
	}

	public create() {
		this._term = terminalEmulator({
			cwd: this._cwd,
			onData: this.recieveData,
			onStopProcessing: this.handleTermStopProcessing,
		});
	}

	public get clientConfig() {
		return {
			cmd: this._cmd,
			cwd: this._cwd,
		};
	}

	public get clientFiles() {
		return [path.join(__dirname, '../../dist/plugins/plugin-terminal/main.js')];
	}

	public connected = () => {
		if (!this.on) {
			return;
		}

		this.on('connected', this.handleConnected);
		this.on('start', this.start);
		this.on('stop', this.stop);
		this.on('clean', this.clean);
	};

	private handleConnected = () => {
		this.send('connected', this._terminalLog);
		if (this._stopProcessingTriggered) {
			this.send('stopped');
		}
	};

	private handleTermStopProcessing = () => {
		this._stopProcessingTriggered = true;
		this.send('stopped');
	};

	private recieveData = (data: string) => {
		this._terminalLog += data.toString();
		if (!this.send) {
			return;
		}
		this.send('recieve', data.toString());
	};

	private stop = () => {
		this._term.kill();
		this.create();
	};

	private clean = () => {
		this._term.write('\x1Bc');
		this._terminalLog = '';
	};

	private start = async () => {
		this._stopProcessingTriggered = false;
		this._term.write(`${this._cmd}\r`);
	};
}
