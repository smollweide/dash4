/* eslint id-blacklist: 0 */
import { error as logError, warn } from '@dash4/log/build/browser';

const win = window as any;
const ws = new WebSocket(`ws://localhost:${win.dash4.port}`);

interface ISocketListeners {
	[key: string]: {
		id: string;
		callback: (data: any) => void;
	};
}

win.dash4 = win.dash4 || {};
win.dash4.socket = win.dash4.socket || {};
win.dash4.socket.isReady = false;
win.dash4.socket.readyList = [];
win.dash4.socket.listeners = {};

const listeners: ISocketListeners = win.dash4.socket.listeners;
let isReady: boolean = win.dash4.socket.isReady;
const readyList: ((value?: ISocketAbstract | PromiseLike<ISocketAbstract> | undefined) => void)[] =
	win.dash4.socket.readyList;

export interface ISocketAction<TData = {}> {
	id: string;
	data: TData;
}

export interface ISocketAbstract {
	send: (id: string, data?: any) => void;
	on: (id: string, callback: any) => void;
	off: (id: string) => void;
}

function socketAbstract(wsInstace: WebSocket): ISocketAbstract {
	return {
		send: (id: string, data: any) => {
			wsInstace.send(
				JSON.stringify({
					id,
					data,
				})
			);
		},
		on: <TCallbackType = any>(id: string, callback: (data: TCallbackType) => void) => {
			listeners[id] = { id, callback };
		},
		off: (id: string) => {
			delete listeners[id];
		},
	};
}

function connected() {
	isReady = true;
	readyList.forEach((resolve: (sk: ISocketAbstract) => void) => {
		resolve(socketAbstract(ws));
	});
	ws.onmessage = (rawData: any) => {
		const data = JSON.parse(rawData.data) as ISocketAction;

		Object.keys(listeners).forEach((key) => {
			const { id, callback } = listeners[key];
			if (id !== data.id) {
				return;
			}
			callback(data.data);
		});
	};
}

function disconnected() {
	warn('client', 'connection closed');
	isReady = false;
}

function error() {
	logError('client', 'connection could not be established');
	isReady = false;
}

ws.onerror = error;
ws.onopen = connected;
ws.onclose = disconnected;

export async function socket(): Promise<ISocketAbstract> {
	return new Promise((resolve) => {
		if (isReady) {
			resolve(socketAbstract(ws));
			return;
		}
		// if socket is not yet ready store resolve function in array
		readyList.push(resolve);
	});
}
