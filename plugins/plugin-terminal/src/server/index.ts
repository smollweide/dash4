import { Dash4Plugin, IDash4Plugin, TOn, TSend } from '@dash4/server';
import fs from 'fs';
import path from 'path';
import { IClientConfig } from '../shared-types';
import { ITerm, terminalEmulator } from './terminal-emulator';

export interface IOptions {
	id: string;
	cmd: string;
	cwd?: string;
	dark?: boolean;
	autostart?: boolean;
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

	constructor({ id, dark = true, width, cmd, cwd, autostart = true }: IOptions) {
		super({
			id,
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
			cwd: this._cwd || process.cwd(),
			onData: this.recieveData,
			onStopProcessing: () => {
				this._stopProcessingTriggered = true;
				this.send('stopped');
			},
		});
	}

	public get clientConfig() {
		return {
			cmd: this._cmd,
			cwd: this._cwd,
		};
	}

	public get clientFiles() {
		return [
			path.join(__dirname, '../../dist/plugins/plugin-terminal/main.js'),
			path.join(__dirname, '../../dist/plugins/plugin-terminal/main.css'),
			{
				pathName: path.join(__dirname, '../../dist/plugins/plugin-terminal/vendors~term.css'),
				scriptTag: false,
			},
			{
				pathName: path.join(__dirname, '../../dist/plugins/plugin-terminal/vendors~term.js'),
				scriptTag: false,
			},
			{
				pathName: path.join(__dirname, '../../dist/plugins/plugin-terminal/term.css'),
				scriptTag: false,
			},
			{
				pathName: path.join(__dirname, '../../dist/plugins/plugin-terminal/term.js'),
				scriptTag: false,
			},
		];
	}

	public connected = () => {
		if (!this.on) {
			return;
		}

		this.on('conntected', () => {
			this.send('conntected', this._terminalLog);
			if (this._stopProcessingTriggered) {
				this.send('stopped');
			}
		});
		this.on('start', this.start);
		this.on('stop', this.stop);
		this.on('clean', this.clean);
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
