import { toParamCase, TType, typeToColor } from '../shared';

type TPackageName = 'client' | 'react-xterm' | 'ui' | string;
type TMessage = string | number | object | any[];
type TConsoleFunc = (packageName: TPackageName, message: TMessage, ...args: TMessage[]) => void;

const defaultLog = (type: TType, packageName: TPackageName, message: TMessage, ...args: TMessage[]) => {
	// eslint-disable-next-line
	console.log(
		`%c❲%c  %c${toParamCase(packageName)}%c❳: %c${message}`,
		`color:#999;`,
		'background:url(https://user-images.githubusercontent.com/2912007/55957959-d9faf400-5c67-11e9-802f-07cabe11694d.png);background-size:12px;',
		`color:#444;font-size:10px;`,
		`color:#999;font-size:10px;`,
		`color:${typeToColor(type)};`,
		...args
	);
};

export const log = defaultLog.bind(null, 'log') as TConsoleFunc;
export const info = defaultLog.bind(null, 'info') as TConsoleFunc;
export const success = defaultLog.bind(null, 'success') as TConsoleFunc;
export const error = defaultLog.bind(null, 'error') as TConsoleFunc;
export const warn = defaultLog.bind(null, 'warn') as TConsoleFunc;
