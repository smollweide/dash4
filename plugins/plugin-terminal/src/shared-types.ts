export interface IClientConfig {
	cmd: string;
	cwd?: string;
}

export const SEND_TO_SERVER_EVENT_NAMES = {
	connected: 'connected',
	start: 'start',
	stop: 'stop',
	clean: 'clean',
} as const;

export type ISendToServerEventNames = keyof typeof SEND_TO_SERVER_EVENT_NAMES;
export type ISendToServerData = void | void | void | void;
export type ISendToServer = (eventName: ISendToServerEventNames, data: ISendToServerData) => void | Promise<void>;

export type IRecieveFromClientEventNames = ISendToServerEventNames;
export type IRecieveFromClientCb = (data: ISendToServerData) => void | Promise<void>;
export type IRecieveFromClient = (
	eventName: IRecieveFromClientEventNames,
	cb: IRecieveFromClientCb
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
