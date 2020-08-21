import chalk from 'chalk';
import ora from 'ora';
import { toParamCase, TType, typeToColor } from './shared';

type TPackageName = 'server' | 'terminal-emulator' | 'cli' | string;
type TMessage = string | number | Record<string, unknown> | any[];
type TConsoleFunc = (packageName: TPackageName, message: TMessage, ...args: TMessage[]) => void;

function getStyledMessage(type: TType, packageName: TPackageName, message: TMessage) {
	return chalk.bgBlack(
		`${chalk.hex('#999')('(Dash4 ')}${chalk.hex('#fff')(toParamCase(packageName))}${chalk.hex('#999')(
			')'
		)} ${chalk.hex(typeToColor(type))(message as string)}`
	);
}

const defaultLog = (type: TType, packageName: TPackageName, message: TMessage, ...args: TMessage[]) => {
	// eslint-disable-next-line
	console.log(getStyledMessage(type, packageName, message), ...args);
};

export const typeOraColorMap = {
	log: 'white',
	info: 'cyan',
	success: 'green',
	error: 'red',
	warn: 'yellow',
} as const;

export function spinner(packageName: TPackageName, message: TMessage, type?: TType) {
	const _spinner = ora(getStyledMessage(type || 'log', packageName, message));
	_spinner.color = type ? typeOraColorMap[type] : 'white';
	let tmpMessage = message;
	let tmpType: TType = type || 'log';
	return {
		start() {
			_spinner.start();
		},
		succeed(_message: string) {
			tmpMessage = _message;
			tmpType = 'success';
			_spinner.color = typeOraColorMap.success;
			_spinner.succeed(getStyledMessage('success', packageName, _message));
		},
		fail(_message: string) {
			tmpMessage = _message;
			tmpType = 'error';
			_spinner.color = typeOraColorMap.error;
			_spinner.fail(getStyledMessage('error', packageName, _message));
		},
		warn(_message: string) {
			tmpMessage = _message;
			tmpType = 'warn';
			_spinner.color = typeOraColorMap.warn;
			_spinner.warn(getStyledMessage('warn', packageName, _message));
		},
		info(_message: string) {
			tmpMessage = _message;
			tmpType = 'info';
			_spinner.color = typeOraColorMap.info;
			_spinner.info(getStyledMessage('info', packageName, _message));
		},
		text(_message: string) {
			tmpMessage = _message;
			_spinner.text = getStyledMessage(tmpType, packageName, _message);
		},
		type(_type: TType) {
			tmpType = _type;
			_spinner.color = typeOraColorMap[_type];
			_spinner.text = getStyledMessage(_type, packageName, tmpMessage);
		},
		stop: _spinner.stop,
		stopAndPersist: _spinner.stopAndPersist,
		isSpinning: _spinner.isSpinning,
		indent: _spinner.indent,
		clear: _spinner.clear,
	};
}

export const log = defaultLog.bind(null, 'log') as TConsoleFunc;
export const info = defaultLog.bind(null, 'info') as TConsoleFunc;
export const success = defaultLog.bind(null, 'success') as TConsoleFunc;
export const error = defaultLog.bind(null, 'error') as TConsoleFunc;
export const warn = defaultLog.bind(null, 'warn') as TConsoleFunc;
