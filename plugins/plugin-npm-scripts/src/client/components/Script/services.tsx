import { socket } from '@dash4/client/build/socket';
export async function subscribeToNpmScriptDataChanges(
	id: string,
	scriptId: string,
	onChange: (data: string, initial?: boolean) => void,
	onStopped: () => void
) {
	const socketData = await socket();
	const on = (name: string, onRecieve: (data: string) => void) => {
		socketData.on(`plugin-npm-scripts-${id}-${scriptId}_${name}`, onRecieve);
	};
	const send = (name: string, data?: number) => {
		socketData.send(`plugin-npm-scripts-${id}-${scriptId}_${name}`, data);
	};
	send('connected');
	on('connected', (data: string) => {
		onChange(data, true);
	});
	on('recieve', (data: string) => {
		onChange(data);
	});
	on('stopped', onStopped);
	return send;
}
export async function unsubscribeToNpmScriptDataChanges(id: string, scriptId: string) {
	const socketData = await socket();
	const off = (name: string) => {
		socketData.off(`plugin-npm-scripts-${id}-${scriptId}_${name}`);
	};
	off('connected');
	off('recieve');
	off('stopped');
}
