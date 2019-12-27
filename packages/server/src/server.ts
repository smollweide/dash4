/* eslint-disable prefer-template */
/* eslint-disable id-blacklist */
/* globals: global */
import { IConfig as IClientConfig } from '@dash4/client/build/index';
import { error, success, warn } from '@dash4/log';
import fs from 'fs-extra';
import { createServer } from 'http';
import { contentType as getContentType } from 'mime-types';
import open from 'open';
import path from 'path';
import WebSocket from 'ws';
import { IClientFile, IConfig, TClientFile, TServerRequest } from './index';

const g = global as any;

g.socket = g.socket || {};
g.socket.isReady = false;
g.socket.readyList = [];
g.socket.listeners = [];

export interface IOptions {
	port: number;
	serverRequestListeners: TServerRequest[];
}

export interface ISocketAction<TData = {}> {
	id: string;
	data: TData;
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

const getClientConfigFromConfig = async (config: IConfig): Promise<IClientConfig> => {
	let version = 'unknown';
	try {
		version = JSON.parse(await fs.readFile(path.join(__dirname, '..', 'package.json'), 'utf8')).version;
	} catch (err) {
		warn('server', `could not read version from @dash4/server package.json: ${err}`);
	}

	return {
		version,
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
							width: plugin.width,
							clientConfig: plugin.clientConfig,
						};
					});
				}),
			};
		}),
	};
};

const hasExtname = (url: string) => {
	return path.extname(url) !== '';
};

export const start = async ({ port, serverRequestListeners }: IOptions, config: IConfig): Promise<ISocketAbstract> => {
	const pluginScripts: IScripts = {};
	const pluginStyles: IScripts = {};
	const pluginFiles: IScripts = {};

	config.tabs.forEach((tab) => {
		tab.rows.forEach((cells) => {
			cells.forEach((plugin: any) => {
				plugin.clientFiles.forEach((clientFile: TClientFile) => {
					const { pathName, scriptTag = true }: IClientFile =
						typeof clientFile === 'string' ? { pathName: clientFile } : clientFile;

					const src = `plugins/${plugin.lowerCaseName}/${path.basename(pathName)}`;

					if (path.extname(pathName) === '.js' && !pluginScripts[src] && scriptTag) {
						pluginScripts[src] = {
							src,
							pathName,
						};
					}
					if (path.extname(pathName) === '.css' && !pluginStyles[src] && scriptTag) {
						pluginStyles[src] = {
							src,
							pathName,
						};
					}
					if (!pluginFiles[src]) {
						pluginFiles[src] = {
							src,
							pathName,
						};
					}
				});
			});
		});
	});

	const server = createServer(async (req, res) => {
		const url = req.url;

		// catch plugin responses
		let i = 0;
		for (i = 0; i < serverRequestListeners.length; i += 1) {
			// eslint-disable-next-line
			if (await serverRequestListeners[i](req, res)) {
				return;
			}
		}

		if (!url || url === '/' || !hasExtname(url)) {
			res.writeHead(200, { 'Content-Type': 'text/html' });
			let indexHtml = fs.readFileSync(require.resolve('@dash4/client/dist/index.html'), 'utf8');
			indexHtml = indexHtml.replace(
				'</body>',
				`<script type="text/javascript">
					window.dash4 = window.dash4 || {};
					window.dash4.port = ${config.port || 4000};
				</script>
				</body>`
			);
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

		Object.keys(pluginFiles).forEach((key) => {
			const pluginFile = pluginFiles[key];
			if (url === `/${pluginFile.src}`) {
				res.writeHead(200, {
					'Content-Type': getContentType(path.extname(pluginFile.pathName)) || '',
				});
				res.end(fs.readFileSync(pluginFile.pathName));
				return;
			}
		});

		if (url === '/config.json') {
			res.writeHead(200, { 'Content-Type': getContentType(path.extname('.json')) || '' });
			res.end(JSON.stringify(await getClientConfigFromConfig(config)));
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
				wss.clients.forEach((client) => {
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
			on: <TCallbackType = any>(id: string, callback: (data: TCallbackType) => {}) => {
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

		ws.on('message', (rawData: any) => {
			const data = JSON.parse(rawData) as ISocketAction;

			g.socket.listeners.forEach(({ id, callback }) => {
				if (id !== data.id) {
					return;
				}
				callback(data.data);
			});
		});
	}

	wss.on('connection', (ws) => {
		success('server', 'connection to a client established');
		connected(ws);
	});

	wss.on('error', (err: Error) => {
		error('server', `connection error ${err}`);
		g.socket.isReady = false;
	});

	server.listen(port);
	success('server', `started on http://localhost:${port}`);
	if (process.env && process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
		await open(`http://localhost:${port}`);
	}

	return new Promise((resolve) => {
		if (g.socket.isReady) {
			resolve(socketAbstract());
			return;
		}
		// if socket is not yet ready store resolve function in array
		g.socket.readyList.push(resolve);
	});
};
