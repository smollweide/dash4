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
	const isWin = os.platform() === 'win32';
	/* istanbul ignore next */
	const reg = isWin ? /PS \w:[^>]*>/ : /bash-3\.2\$ ?$/;
	let regMatchCounter = 0;
	/* istanbul ignore next */
	const shell = isWin ? 'powershell.exe' : 'bash';
	(process.env.FORCE_COLOR as any) = true;

	const ptyProcess = spawn(shell, [], {
		name: 'xterm-color',
		cols: 500,
		rows: 30,
		cwd,
		env: process.env as any,
	});

	ptyProcess.on('data', (data: string) => {
		if (reg.test(data)) {
			regMatchCounter += 1;
			/* istanbul ignore next */
			if (isWin && regMatchCounter <= 2) {
				// ignore first match on windows
				return;
			}
			regMatchCounter = 0;
			if (onStopProcessing) {
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
