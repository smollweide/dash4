const win = window as any;
const ws = new WebSocket(`ws://localhost:${win.dash4.port}`);
// tslint:disable-next-line
const log = console.log;

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
const readyList: Array<(value?: ISocketAbstract | PromiseLike<ISocketAbstract> | undefined) => void> =
	win.dash4.socket.readyList;

export interface ISocketAction<Data = {}> {
	id: string;
	data: Data;
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
		on: <CallbackType = any>(id: string, callback: (data: CallbackType) => void) => {
			listeners[id] = { id, callback };
		},
		off: (id: string) => {
			delete listeners[id];
		},
	};
}

function connected() {
	log('[socket]: connection established');
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
	log('[socket]: connection closed');
	isReady = false;
}

function error() {
	log('[socket]: connection could not be established');
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
