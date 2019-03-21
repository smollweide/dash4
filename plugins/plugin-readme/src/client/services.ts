import { socket } from '@dash4/client/build/socket';

export async function subscribeToReadme(id: string, onChange: (data: string) => void) {
	const socketData = await socket();
	const on = (name: string, callback: (data: string) => void) => {
		socketData.on(`plugin-readme-${id}_${name}`, callback);
	};
	const send = (name: string, data?: string) => {
		socketData.send(`plugin-readme-${id}_${name}`, data);
	};

	send('conntected');
	on('data', (data: string) => {
		onChange(data);
	});

	return send;
}

export async function unsubscribeToReadme(id: string) {
	const socketData = await socket();
	const off = (name: string) => {
		socketData.off(`plugin-terminal-${id}_${name}`);
	};

	off('conntected');
}
