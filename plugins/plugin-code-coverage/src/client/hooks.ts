import { useEffectAsync } from '@dash4/client/build/react-hooks';
import { useState } from 'react';
import { ICoverage } from '../shared-types';
import { subscribe, unsubscribe } from './services';

export type ISend = (name: string, data?: string) => void;

export function useCoverageData(id: string, sendFactory: (send: ISend) => void) {
	const [data, setData] = useState<ICoverage | undefined>(undefined);

	useEffectAsync(async () => {
		const _send = await subscribe(id, (_data: ICoverage) => setData(_data));
		sendFactory(_send);
		return async () => unsubscribe(id);
	}, []);

	return data;
}
