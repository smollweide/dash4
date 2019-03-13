import { IPty, spawn } from 'node-pty';
import os from 'os';

interface ITerminalEmulator {
	cwd: string;
	onData: (data: string) => void;
	onExit?: () => void;
	onStopProcessing?: () => void;
}

export type ITerm = IPty;

export const terminalEmulator = ({ cwd, onData, onStopProcessing, onExit }: ITerminalEmulator) => {
	const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
	let stopProcessingAlreadyTriggered = false;
	(process.env.FORCE_COLOR as any) = true;

	const ptyProcess = spawn(shell, [], {
		name: 'xterm-color',
		cols: 500,
		rows: 1000,
		cwd,
		env: process.env as any,
	});

	ptyProcess.on('data', (data: string) => {
		if (/bash-3\.2\$ $/.test(data)) {
			if (onStopProcessing) {
				stopProcessingAlreadyTriggered = true;
				onStopProcessing();
			}
			return;
		}
		onData(data);
	});
	ptyProcess.on('exit', () => {
		if (onExit) {
			onExit();
		}
	});

	return ptyProcess;
};
