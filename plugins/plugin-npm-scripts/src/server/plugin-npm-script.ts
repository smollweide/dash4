import { TOn, TSend } from '@dash4/server';
import { IScriptWithId } from '../shared-types';
import { ITerm, terminalEmulator } from './terminal-emulator';

interface IOptions {
	id: string;
	script: IScriptWithId;
}

export class PluginNpmScript {
	private id: string;
	private script: IScriptWithId;
	private terminalLog: string = '';
	private term?: ITerm;
	private _on?: (id: string, callback: any) => void;
	private _send?: (id: string, data?: any) => void;
	private stopProcessingTriggered: boolean = false;

	constructor({ id, script }: IOptions) {
		this.id = id;
		this.script = script;
	}

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
		this.on('request-terminal-data', () => {
			this.send('recieve', this.terminalLog);
		});
		this.on('start', this.start);
		this.on('stop', this.stop);
		this.on('clean', this.clean);
	};

	private send = (eventName: string, data?: string) => {
		if (!this._send) {
			return;
		}
		this._send(`plugin-npm-scripts-${this.id}-${this.script.id}_${eventName}`, data);
	};

	private on = <CbData = undefined>(eventName: string, cb: (data?: CbData) => void) => {
		if (!this._on) {
			return;
		}
		this._on(`plugin-npm-scripts-${this.id}-${this.script.id}_${eventName}`, cb);
	};

	private recieveData = (data: string) => {
		this.terminalLog += data.toString();
		if (!this.send) {
			return;
		}
		this.send('recieve', data.toString());
	};

	private create() {
		if (this.term) {
			return false;
		}
		this.term = terminalEmulator({
			cwd: this.script.cwd,
			onData: this.recieveData,
			onStopProcessing: () => {
				this.stopProcessingTriggered = true;
				this.send('stopped');
			},
		});
		return true;
	}

	private stop = () => {
		if (!this.term) {
			return;
		}
		this.term.kill();
		this.term = undefined;
		this.create();
	};

	private clean = () => {
		if (!this.term) {
			return;
		}
		this.term.write('\x1Bc');
		this.terminalLog = '';
	};

	private start = async () => {
		this.create();
		if (!this.term) {
			return;
		}
		this.stopProcessingTriggered = false;
		this.term.write(`${this.script.cmd}\r`);
	};
}
