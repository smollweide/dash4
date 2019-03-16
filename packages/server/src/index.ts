import uuid from 'uuid/v1';

export type TOn = (id: string, callback: any) => void;
export type TSend = (id: string, data?: any) => void;

export interface IClientFile {
	pathName: string;
	scriptTag?: boolean;
}

export type TClientFile = string | IClientFile;

export interface IDash4Plugin<IClientConfig = {}> {
	clientFiles: TClientFile[];
	dark: boolean;
	width?: number[];
	clientConfig: IClientConfig;
	connected: () => void;
}

export interface IConfigPlugin extends IDash4Plugin {
	id: string;
	name: string;
	lowerCaseName: string;
	connect: (on: TOn, send: TSend) => void;
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

export class Dash4Plugin {
	private _id: string;
	private _dark: boolean;
	private _width?: number[];
	private _name?: string;
	private _lowerCaseName?: string;
	private _on?: (id: string, callback: any) => void;
	private _send?: (id: string, data?: any) => void;

	constructor({ dark = false, width, lowerCaseName, name }: IPluginOptions) {
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

		this.connected();
	};

	public connected = () => {
		// tslint:disable-next-line
		// override
	};

	protected send = (eventName: string, data?: string) => {
		if (!this._send) {
			return;
		}
		this._send(`${this.lowerCaseName}-${this.id}_${eventName}`, data);
	};

	protected on = <CbData = undefined>(eventName: string, cb: (data?: CbData) => void) => {
		if (!this._on) {
			return;
		}
		this._on(`${this.lowerCaseName}-${this.id}_${eventName}`, cb);
	};
}
