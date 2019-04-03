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

		this.on('connected', this.handleConnected);
		this.on('request-terminal-data', this.handleRequestData);
		this.on('start', this.start);
		this.on('stop', this.stop);
		this.on('clean', this.clean);
	};

	private handleRequestData = () => {
		this.send('recieve', this.terminalLog);
	};

	private handleConnected = () => {
		this.send('connected', this.terminalLog);
		if (this.stopProcessingTriggered) {
			this.send('stopped');
		}
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

	private handleRecieveData = (data: string) => {
		this.terminalLog += data.toString();
		this.send('recieve', data.toString());
	};

	private create() {
		if (this.term) {
			return false;
		}
		this.term = terminalEmulator({
			cwd: this.script.cwd,
			onData: this.handleRecieveData,
			onStopProcessing: this.handleTerminalProcessStopped,
		});
		return true;
	}

	private handleTerminalProcessStopped = () => {
		this.stopProcessingTriggered = true;
		this.send('stopped');
	};

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
		if (!this.term) {
			this.create();
		}
		this.stopProcessingTriggered = false;
		if (this.term) {
			this.term.write(`${this.script.cmd}\r`);
		}
	};
}
