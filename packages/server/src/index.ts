import { IncomingMessage, ServerResponse } from 'http';
import { v1 as uuid } from 'uuid';

export type TOn = (id: string, onReady: any) => void;
export type TSend = (id: string, data?: any) => void;

export interface IClientFile {
	pathName: string;
	scriptTag?: boolean;
}

export type TClientFile = string | IClientFile;

export interface IDash4Plugin<TClientConfig = Record<string, unknown>> {
	clientFiles: TClientFile[];
	dark: boolean;
	width?: number[];
	clientConfig: TClientConfig;
	connected: (on: TOn, send: TSend) => void;
}

export type TServerRequest = (req: IncomingMessage, res: ServerResponse) => Promise<boolean>;

export interface IConfigPlugin extends IDash4Plugin {
	id: string;
	name: string;
	lowerCaseName: string;
	connect: (on: TOn, send: TSend) => void;
	serverRequest?: TServerRequest;
	serverRequests?: TServerRequest[];
}

export interface IConfigTab {
	title: string;
	rows: IConfigPlugin[][];
}

export interface IConfig {
	port?: number;
	tabs: IConfigTab[];
}

export interface IPluginOptions {
	name: string;
	lowerCaseName: string;
	dark?: boolean;
	width?: number[];
}

export class Dash4Plugin<TOnEventName = any, TOnCb = any, TSendEventName = any, TSendData = any> {
	protected _on?: (id: string, onReady: any) => void;
	protected _send?: (id: string, data?: any) => void;
	private _id: string;
	private _dark: boolean;
	private _width?: number[];
	private _name?: string;
	private _lowerCaseName?: string;

	public constructor({ dark = false, width, lowerCaseName, name }: IPluginOptions) {
		this._id = uuid();
		this._dark = dark;
		this._width = width;
		this._lowerCaseName = lowerCaseName;
		this._name = name;
	}

	public get id() {
		return this._id;
	}

	public get dark() {
		return this._dark;
	}

	public get width() {
		return this._width;
	}

	public get name() {
		return this._name;
	}

	public get lowerCaseName() {
		return this._lowerCaseName;
	}

	public connect = (on: TOn, send: TSend) => {
		this._on = on;
		this._send = send;

		this.connected(on, send);
	};

	// eslint-disable-next-line
	public connected = (on: TOn, send: TSend) => {
		// eslint-disable-next-line
		// override
	};

	// protected send = ()()
	protected send = (eventName: TSendEventName, data: TSendData) => {
		if (!this._send) {
			return;
		}
		this._send(`${this.lowerCaseName}-${this.id}_${eventName}`, data);
	};

	protected on = (eventName: TOnEventName, cb: TOnCb) => {
		if (!this._on) {
			return;
		}
		this._on(`${this.lowerCaseName}-${this.id}_${eventName}`, cb);
	};
}
