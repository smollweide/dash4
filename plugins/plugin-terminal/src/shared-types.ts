export interface IAllowedCommand {
	keyCode: number | string;
	terminalOutput?: string;
	title: string;
	input?: (value: string) => string;
}

export interface IAllowedCommandConfig {
	keyCode: number | string;
	title: string;
	hasInput: boolean;
}

export interface IClientConfig {
	cmd: string;
	cwd?: string;
	allowedCommands?: { [key: string]: IAllowedCommandConfig };
}

export const SEND_TO_SERVER_EVENT_NAMES = {
	connected: 'connected',
	start: 'start',
	stop: 'stop',
	clean: 'clean',
	command: 'command',
	'command-input': 'command-input',
} as const;

export type ISendToServerEventNames = keyof typeof SEND_TO_SERVER_EVENT_NAMES;
export type ISendToServerData = void | void | void | void | string | { value: string; commandId: string };
export type ISendToServer = (eventName: ISendToServerEventNames, data: ISendToServerData) => void | Promise<void>;

export type IRecieveFromClientEventNames = ISendToServerEventNames;
export type IRecieveFromClientCb = (data: ISendToServerData) => void | Promise<void>;
export type IRecieveFromClient = (
	eventName: IRecieveFromClientEventNames,
	cb: (data: ISendToServerData) => void | Promise<void>
) => void | Promise<void>;

export const SEND_TO_CLIENT_EVENT_NAMES = {
	connected: 'connected',
	recieve: 'recieve',
	stopped: 'stopped',
} as const;

export type ISendToClientEventNames = keyof typeof SEND_TO_CLIENT_EVENT_NAMES;
export type ISendToClientData = string | string | void;
export type ISendToClient = (eventName: ISendToClientEventNames, data: ISendToClientData) => void | Promise<void>;

export type IRecieveFromServerEventNames = ISendToClientEventNames;
export type IRecieveFromServerCb = (data: ISendToClientData) => void | Promise<void>;
export type IRecieveFromServer = (
	eventName: IRecieveFromServerEventNames,
	cb: IRecieveFromServerCb
) => void | Promise<void>;
