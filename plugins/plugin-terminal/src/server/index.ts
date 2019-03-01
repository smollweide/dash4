import { IPlugin, TOn, TSend } from '@dash4/server';
import path from 'path';
import { IAdditionals } from '../src/shared-types';
import { ITerm, terminalEmulator } from './terminal-emulator';

export interface IOptions {
	id: string;
	cmd: string;
	cwd?: string;
	dark?: boolean;
}

export class PluginTerminal implements IPlugin<IAdditionals> {
	public id: string;
	public cmd: string;
	public dark: boolean;
	public cwd?: string;
	private terminalLog: string = '';
	private autostart: boolean = true;
	private term: ITerm;
	private recievedCounter: number = 0;
	private _on?: (id: string, callback: any) => void;
	private _send?: (id: string, data?: any) => void;
	private stopProcessingTriggered: boolean = false;

	constructor({ cmd, id, cwd, dark = false }: IOptions) {
		this.cmd = cmd;
		// this.cmdArr = cmd.split(' ');
		this.id = id;
		this.cwd = cwd;
		this.dark = dark;

		this.create();

		if (this.autostart) {
			this.start();
		}
	}

	public create() {
		this.term = terminalEmulator({
			cwd: this.cwd || process.cwd(),
			onData: this.recieveData,
			onStopProcessing: () => {
				this.stopProcessingTriggered = true;
				this.send('stopped');
			},
		});
	}

	public get additionals() {
		return {
			cmd: this.cmd,
			cwd: this.cwd,
		};
	}

	public get name() {
		return 'PluginTerminal';
	}

	public get lowerCaseName() {
		return 'plugin-terminal';
	}

	public get clientFiles() {
		return [path.join(__dirname, '../../dist/main.js'), path.join(__dirname, '../../dist/main.css')];
	}

	public send = (eventName: string, data?: string) => {
		if (!this._send) {
			return;
		}
		this._send(`plugin-terminal-${this.id}_${eventName}`, data);
	};

	public on = <CbData = undefined>(eventName: string, cb: (data?: CbData) => void) => {
		if (!this._on) {
			return;
		}
		this._on(`plugin-terminal-${this.id}_${eventName}`, cb);
	};

	public connect = (on: TOn, send: TSend) => {
		this._on = on;
		this._send = send;

		if (!this._on) {
			return;
		}

		this.on('conntected', () => {
			this.send('conntected', this.terminalLog);
			if (this.stopProcessingTriggered) {
				this.send('stopped');
			}
		});
		this.on('start', this.start);
		this.on('stop', this.stop);
		this.on('clean', this.clean);
	};

	private recieveData = (data: string) => {
		this.recievedCounter += 1;
		if (this.recievedCounter === 1) {
			return;
		}
		this.terminalLog += data.toString();
		if (!this.send) {
			return;
		}
		this.send('recieve', data.toString());
	};

	private stop = () => {
		this.term.kill();
		this.create();
	};

	private clean = () => {
		this.term.write('\x1Bc');
		this.terminalLog = '';
	};

	private start = async () => {
		this.stopProcessingTriggered = false;
		this.term.write(`${this.cmd}\r`);
	};
}
