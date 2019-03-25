import { socket } from '@dash4/client/build/socket';
import { ICoverage } from '../shared-types';

export async function subscribe(id: string, onChange: (data: ICoverage) => void) {
	const socketData = await socket();
	const on = (name: string, callback: (data: ICoverage) => void) => {
		socketData.on(`plugin-code-coverage-${id}_${name}`, callback);
	};
	const send = (name: string, data?: string) => {
		socketData.send(`plugin-code-coverage-${id}_${name}`, data);
	};

	send('conntected');
	on('data', (data: ICoverage) => {
		onChange(data);
	});

	return send;
}

export async function unsubscribe(id: string) {
	const socketData = await socket();
	const off = (name: string) => {
		socketData.off(`plugin-code-coverage-${id}_${name}`);
	};

	off('conntected');
	off('data');
}
