import { useEffectAsync } from '@dash4/client/build/react-hooks';
import { useState } from 'react';
import { subscribeToReadme, unsubscribeToReadme } from './services';

export function useMarkdownData(id: string) {
	const [data, setData] = useState('');
	const handleRecieveData = (_data: string) => setData(_data);
	useEffectAsync(async () => {
		await subscribeToReadme(id, handleRecieveData);
		return () => unsubscribeToReadme(id);
	}, []);
	return data;
}
