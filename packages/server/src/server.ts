/* globals: global */
import { IConfig as IClientConfig } from '@dash4/client/build/index';
import fs from 'fs';
import { createServer } from 'http';
import { contentType as getContentType } from 'mime-types';
import path from 'path';
import WebSocket from 'ws';
import { IConfig } from './index';

// tslint:disable-next-line
const log = console.log;
const g = global as any;

g.socket = g.socket || {};
g.socket.isReady = false;
g.socket.readyList = [];
g.socket.listeners = [];

export interface IOptions {
	port: number;
}

export interface ISocketAction<Data = {}> {
	id: string;
	data: Data;
}

export interface ISocketAbstract {
	send: (id: string, data?: any) => void;
	on: (id: string, callback: any) => void;
}

interface IScripts {
	[key: string]: {
		pathName: string;
		src: string;
	};
}

const getClientConfigFromConfig = (config: IConfig): IClientConfig => {
	return {
		tabs: config.tabs.map((tab) => {
			return {
				title: tab.title,
				rows: tab.rows.map((row) => {
					return row.map((plugin) => {
						return {
							id: plugin.id,
							name: plugin.name,
							lowerCaseName: plugin.lowerCaseName,
							dark: plugin.dark,
							additionals: plugin.additionals,
						};
					});
				}),
			};
		}),
	};
};

export const start = ({ port }: IOptions, config: IConfig): Promise<ISocketAbstract> => {
	const pluginScripts: IScripts = {};
	const pluginStyles: IScripts = {};

	config.tabs.forEach((tab) => {
		tab.rows.forEach((cells) => {
			cells.forEach((plugin: any) => {
				plugin.clientFiles.forEach((clientFile: string) => {
					const src = `plugins/${plugin.lowerCaseName}/${path.basename(clientFile)}`;

					if (path.extname(clientFile) === '.js' && !pluginScripts[src]) {
						pluginScripts[src] = {
							src,
							pathName: clientFile,
						};
						return;
					}
					if (path.extname(clientFile) === '.css' && !pluginStyles[src]) {
						pluginStyles[src] = {
							src,
							pathName: clientFile,
						};
						return;
					}
				});
			});
		});
	});

	const server = createServer((req, res) => {
		const url = req.url;

		if (!url || url === '/') {
			res.writeHead(200, { 'Content-Type': 'text/html' });
			let indexHtml = fs.readFileSync(require.resolve('@dash4/client/dist/index.html'), 'utf8');
			indexHtml = indexHtml.replace(
				'</body>',
				Object.keys(pluginScripts)
					.map((key) => `<script type="text/javascript" src="/${pluginScripts[key].src}"></script>`)
					.join('\n') + '</body>'
			);
			indexHtml = indexHtml.replace(
				'</head>',
				Object.keys(pluginStyles)
					.map((key) => `<link rel="stylesheet" href="/${pluginStyles[key].src}" />`)
					.join('\n') + '</head>'
			);
			if (process.env.NODE_ENV === 'development') {
				indexHtml = indexHtml.replace(
					'https://unpkg.com/react@16/umd/react.production.min.js',
					'https://unpkg.com/react@16/umd/react.development.js'
				);
				indexHtml = indexHtml.replace(
					'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
					'https://unpkg.com/react-dom@16/umd/react-dom.development.js'
				);
			}
			res.end(indexHtml);
			return;
		}

		Object.keys(pluginScripts).forEach((key) => {
			const pluginScript = pluginScripts[key];
			if (url === `/${pluginScript.src}`) {
				res.writeHead(200, { 'Content-Type': getContentType(path.extname(pluginScript.pathName)) || '' });
				res.end(fs.readFileSync(pluginScript.pathName));
				return;
			}
		});

		Object.keys(pluginStyles).forEach((key) => {
			const pluginStyle = pluginStyles[key];
			if (url === `/${pluginStyle.src}`) {
				res.writeHead(200, { 'Content-Type': getContentType(path.extname(pluginStyle.pathName)) || '' });
				res.end(fs.readFileSync(pluginStyle.pathName));
				return;
			}
		});

		if (url === '/config.json') {
			res.writeHead(200, { 'Content-Type': getContentType(path.extname('.json')) || '' });
			res.end(JSON.stringify(getClientConfigFromConfig(config)));
			return;
		}

		if (url.includes('..')) {
			res.writeHead(400);
			res.end('');
			return;
		}

		let pathName: string;

		try {
			pathName = require.resolve(`@dash4/client/dist${url}`);
		} catch (err) {
			res.writeHead(400);
			res.end('');
			return;
		}

		const contentType = getContentType(path.extname(pathName));

		if (!contentType) {
			res.writeHead(400);
			res.end('');
			return;
		}

		res.writeHead(200, { 'Content-Type': contentType });
		res.end(fs.readFileSync(pathName));
	});

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
		log('[socket]: connection established');
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
		log(`[socket] connection to client established`);
		connected(ws);
	});

	wss.on('error', function wserror(err: Error) {
		log(`[socket] connection error ${err}`);
		g.socket.isReady = false;
	});

	server.listen(port);
	log(`server started on http://localhost:${port}`);

	return new Promise((resolve) => {
		if (g.socket.isReady) {
			resolve(socketAbstract());
			return;
		}
		// if socket is not yet ready store resolve function in array
		g.socket.readyList.push(resolve);
	});
};
