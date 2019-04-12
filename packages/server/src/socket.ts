/* globals: global */
import { error, success } from '@dash4/log';
import { createServer } from 'https';
import WebSocket from 'ws';

const g = global as any;
const server = createServer({});
const wss = new WebSocket.Server({
	server,
	perMessageDeflate: {
		zlibDeflateOptions: {
			// See zlib defaults.
			chunkSize: 1024,
			memLevel: 7,
			level: 3,
		},
		// Other options settable:
		clientNoContextTakeover: true, // Defaults to negotiated value.
		serverNoContextTakeover: true, // Defaults to negotiated value.
		serverMaxWindowBits: 10, // Defaults to negotiated value.
		// Below options specified as default values.
		concurrencyLimit: 10, // Limits zlib concurrency for perf.
		threshold: 1024, // Size (in bytes) below which messages
		// should not be compressed.
	},
});

server.listen(8080);

g.socket = g.socket || {};
g.socket.isReady = false;
g.socket.readyList = [];
g.socket.listeners = [];

export interface ISocketAction<Data = {}> {
	id: string;
	data: Data;
}

export interface ISocketAbstract {
	send: (id: string, data?: any) => void;
	on: (id: string, callback: any) => void;
}

function socketAbstract(): ISocketAbstract {
	return {
		send: (id: string, data: any) => {
			wss.clients.forEach(function each(client) {
				if (client.readyState === WebSocket.OPEN) {
					client.send(
						JSON.stringify({
							id,
							data,
						})
					);
				}
			});
		},
		on: <CallbackType = any>(id: string, callback: (data: CallbackType) => {}) => {
			g.socket.listeners.push({ id, callback });
		},
	};
}

function connected(ws: WebSocket) {
	success('server', 'connection established');
	g.socket.isReady = true;
	g.socket.readyList.forEach((resolve: (sk: ISocketAbstract) => void) => {
		resolve(socketAbstract());
	});

	ws.on('message', function incoming(rawData: any) {
		const data = JSON.parse(rawData) as ISocketAction;

		g.socket.listeners.forEach(({ id, callback }) => {
			if (id !== data.id) {
				return;
			}
			callback(data.data);
		});
	});
}

wss.on('connection', function connection(ws) {
	success('server', `connection to client established`);
	connected(ws);
});

wss.on('error', function wserror(err: Error) {
	error('server', `connection error ${err}`);
	g.socket.isReady = false;
});

export async function socket(): Promise<ISocketAbstract> {
	return new Promise((resolve) => {
		if (g.socket.isReady) {
			resolve(socketAbstract());
			return;
		}
		// if socket is not yet ready store resolve function in array
		g.socket.readyList.push(resolve);
	});
}
