import { socket } from '@dash4/client/build/socket';
import { IRecieveFromServer, ISendToServer, SEND_TO_CLIENT_EVENT_NAMES } from '../shared-types';

export async function subscribeToTerminalDataChanges(
	id: string,
	onChange: (data: string) => void,
	onStopped: () => void
) {
	const socketData = await socket();
	const on: IRecieveFromServer = (name: string, callback: (data: string) => void) => {
		socketData.on(`plugin-terminal-${id}_${name}`, callback);
	};
	const send: ISendToServer = (name: string, data) => {
		socketData.send(`plugin-terminal-${id}_${name}`, data);
	};
	send('connected');
	on('connected', (data: string) => {
		onChange(data);
	});
	on('recieve', (data: string) => {
		onChange(data);
	});
	on('stopped', onStopped);
	return send;
}
export async function unsubscribeToTerminalDataChanges(id: string) {
	const socketData = await socket();
	const off = (name: string) => {
		socketData.off(`plugin-terminal-${id}_${name}`);
	};

	Object.keys(SEND_TO_CLIENT_EVENT_NAMES).forEach((key) => {
		off(key);
	});
}
