import { socket } from '@dash4/client/build/socket';
import { IDependencyObj, IError, IRecieveFromServer, ISendToServer, SEND_TO_CLIENT_EVENT_NAMES } from '../shared-types';

export async function subscribe(id: string, onChange: (data: IDependencyObj | IError) => void) {
	const socketData = await socket();
	const on: IRecieveFromServer = (name, callback) => {
		socketData.on(`plugin-dependencies-${id}_${name}`, callback);
	};
	const send: ISendToServer = (name, data) => {
		socketData.send(`plugin-dependencies-${id}_${name}`, data);
	};

	send('connected');
	on('data', (data) => {
		onChange(data);
	});

	return send;
}

export async function unsubscribe(id: string) {
	const socketData = await socket();
	const off = (name: string) => {
		socketData.off(`plugin-dependencies-${id}_${name}`);
	};

	Object.keys(SEND_TO_CLIENT_EVENT_NAMES).forEach((key) => {
		off(key);
	});
}
