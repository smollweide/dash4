export interface IInstallProcess {
	// custom title for installation process (default=npm run install)
	title?: string;
	// current working directory of the child process. (default = process.cwd())
	cwd?: string;
	// command which should be executed (default = 'npm run install')
	cmd?: string;
}

export interface IInstallProcessPrepared {
	id: string;
	title: string;
	cwd: string;
	cmd: string;
}

export interface IClientConfig {
	title?: string;
	cwd: string;
	installProcess: IInstallProcessPrepared;
}

export interface IPackageJson {
	[key: string]: any;
	name?: string;
	version?: string;
	description?: string;
	dependencies?: { [key: string]: string };
	devDependencies?: { [key: string]: string };
}

export interface IError {
	error: boolean;
	message: string;
}

export interface IDependency {
	version: string;
	latestVersion?: string;
	isUpToDate: boolean | null;
	pathes: string[];
	packages: string[];
}

export interface IDependencyObj {
	[key: string]: IDependency;
}

export interface IDependencyData {
	dependencies: IDependencyObj;
	devDependencies: IDependencyObj;
}

export const SEND_TO_SERVER_EVENT_NAMES = {
	connected: 'connected',
	update: 'update',
	install: 'install',
} as const;

export type ISendToServerEventNames = keyof typeof SEND_TO_SERVER_EVENT_NAMES;
export type ISendToServerData = void | string | void;
export type ISendToServer = (eventName: ISendToServerEventNames, data: ISendToServerData) => void | Promise<void>;

export type IRecieveFromClientEventNames = ISendToServerEventNames;
export type IRecieveFromClientCb = (data: ISendToServerData) => void | Promise<void>;
export type IRecieveFromClient = (
	eventName: IRecieveFromClientEventNames,
	cb: IRecieveFromClientCb
) => void | Promise<void>;

export const SEND_TO_CLIENT_EVENT_NAMES = {
	data: 'data',
} as const;

export type ISendToClientEventNames = keyof typeof SEND_TO_CLIENT_EVENT_NAMES;
export type ISendToClientData = IDependencyObj | IError;
export type ISendToClient = (eventName: ISendToClientEventNames, data: ISendToClientData) => void | Promise<void>;

export type IRecieveFromServerEventNames = ISendToClientEventNames;
export type IRecieveFromServerCb = (data: ISendToClientData) => void | Promise<void>;
export type IRecieveFromServer = (
	eventName: IRecieveFromServerEventNames,
	cb: IRecieveFromServerCb
) => void | Promise<void>;
