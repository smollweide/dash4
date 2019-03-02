const win = window as any;
const ws = new WebSocket(`ws://localhost:${win.dash4.port}`);
// tslint:disable-next-line
const log = console.log;

win.socket = win.socket || {};
win.socket.isReady = false;
win.socket.readyList = [];
win.socket.listeners = [];

export interface ISocketAction<Data = {}> {
	id: string;
	data: Data;
}

export interface ISocketAbstract {
	send: (id: string, data?: any) => void;
	on: (id: string, callback: any) => void;
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
		on: <CallbackType = any>(id: string, callback: (data: CallbackType) => {}) => {
			win.socket.listeners.push({ id, callback });
		},
	};
}

function connected() {
	log('[socket]: connection established');
	win.socket.isReady = true;
	win.socket.readyList.forEach((resolve: (sk: ISocketAbstract) => void) => {
		resolve(socketAbstract(ws));
	});
	ws.onmessage = (rawData: any) => {
		const data = JSON.parse(rawData.data) as ISocketAction;

		win.socket.listeners.forEach(({ id, callback }) => {
			if (id !== data.id) {
				return;
			}
			callback(data.data);
		});
	};
}

function disconnected() {
	log('[socket]: connection closed');
	win.socket.isReady = false;
}

function error() {
	log('[socket]: connection could not be established');
	win.socket.isReady = false;
}

ws.onerror = error;
ws.onopen = connected;
ws.onclose = disconnected;

export async function socket(): Promise<ISocketAbstract> {
	return new Promise((resolve) => {
		if (win.socket.isReady) {
			resolve(socketAbstract(ws));
			return;
		}
		// if socket is not yet ready store resolve function in array
		win.socket.readyList.push(resolve);
	});
}
