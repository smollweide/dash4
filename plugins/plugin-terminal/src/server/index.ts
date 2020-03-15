import { Dash4Plugin, IDash4Plugin } from '@dash4/server';
import { ITerm, terminalEmulator } from '@dash4/terminal-emulator';
import fs from 'fs';
import path from 'path';
import { v1 as uuid } from 'uuid';
import {
	IAllowedCommand,
	IClientConfig,
	IRecieveFromClientCb,
	IRecieveFromClientEventNames,
	ISendToClientData,
	ISendToClientEventNames,
} from '../shared-types';

export * from './jest-commands';

export interface IOptions {
	// command which should be executed
	cmd: string;
	// current working directory of the child process.
	cwd?: string;
	// define a custom title for the window
	title?: string;
	// define a custom subtitle for the window
	subtitle?: string;
	// define commands (keycodes) which are allowed to enter
	allowedCommands?: IAllowedCommand[];
	// enable/disable dark mode
	dark?: boolean;
	// the given command will be executed on start
	autostart?: boolean;
	// grid with per breakpoint
	// [12,6,3] means 100% width on small viewports, 50% on medium viewports and 33.3% on large viewports
	width?: number[];
	// define fixed height
	height?: number;
}

const processCwd = fs.realpathSync(process.cwd());

export class PluginTerminal
	extends Dash4Plugin<IRecieveFromClientEventNames, IRecieveFromClientCb, ISendToClientEventNames, ISendToClientData>
	implements IDash4Plugin<IClientConfig> {
	private _cmd: string;
	private _cwd: string;
	private _terminalLog = '';
	private _autostart: boolean;
	private _term?: ITerm;
	private _stopProcessingTriggered = false;
	private _allowedCommands?: { [key: string]: IAllowedCommand };
	private _height?: number;
	private _title?: string;
	private _subtitle?: string;

	public constructor({
		dark = true,
		width,
		height,
		title,
		subtitle,
		cmd,
		cwd,
		autostart = false,
		allowedCommands,
	}: IOptions) {
		super({
			dark,
			width,
			name: 'PluginTerminal',
			lowerCaseName: 'plugin-terminal',
		});

		this._cmd = cmd;
		this._cwd = cwd ? path.join(processCwd, cwd) : processCwd;
		this._autostart = autostart;
		this._height = height;
		this._title = title;
		this._subtitle = subtitle;

		if (allowedCommands) {
			allowedCommands.forEach((allowedCommand) => {
				if (!this._allowedCommands) {
					this._allowedCommands = {};
				}
				this._allowedCommands[uuid()] = allowedCommand;
			});
		}

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
		const allowedCommands = {};
		Object.keys(this._allowedCommands || {}).forEach((commandId) => {
			if (!this._allowedCommands || !this._allowedCommands[commandId]) {
				return;
			}
			allowedCommands[commandId] = {
				keyCode: this._allowedCommands[commandId].keyCode,
				title: this._allowedCommands[commandId].title,
				hasInput: typeof this._allowedCommands[commandId].input === 'function',
			};
		});
		return {
			cmd: this._cmd,
			cwd: this._cwd,
			allowedCommands,
			height: this._height,
			title: this._title,
			subtitle: this._subtitle,
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
		this.on('command', this.appendCommand);
		this.on('command-input', this.appendCommandInput);
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

	private getCommandById = (commandId: string) => {
		if (!this._allowedCommands || !this._allowedCommands[commandId]) {
			return;
		}
		return this._allowedCommands[commandId];
	};

	private appendCommand = (commandId: string) => {
		const command = this.getCommandById(commandId);
		if (!command) {
			return;
		}
		const out = command.terminalOutput || command.keyCode.toString();
		this._terminalLog += out;
		if (!this._term) {
			return;
		}
		this._term.write(out);
	};

	private appendCommandInput = ({ value, commandId }: { value: string; commandId: string }) => {
		const command = this.getCommandById(commandId);
		if (!command || !command.input || !value || !commandId) {
			return;
		}
		const out = command.input(value);
		this._terminalLog += out;
		if (!this._term) {
			return;
		}
		this._term.write(out);
		setTimeout(() => {
			if (!this._term) {
				return;
			}
			this._term.write('\r');
		}, 100);
	};

	private recieveData = (data: string) => {
		this._terminalLog += data.toString();
		if (!this.send) {
			return;
		}
		this.send('recieve', data.toString());
	};

	private kill = () => {
		if (!this._term) {
			return;
		}
		this._term.kill();
	};

	private write = (cmd: string) => {
		if (!this._term) {
			return;
		}
		this._term.write(cmd);
	};

	private stop = () => {
		this._terminalLog = '';
		this.kill();
	};

	private clean = () => {
		this.write('\x1Bc');
		this._terminalLog = '';
	};

	private start = async () => {
		this.create();
		this._stopProcessingTriggered = false;
		this.write(`${this._cmd}\r`);
	};
}
