import { useEffectAsync } from '@dash4/client/build/react-hooks';
import { useState } from 'react';
import { IDependencyObj, IError, ISendToServer } from '../shared-types';
import { subscribe, unsubscribe } from './services';

export function useData(id: string, sendFactory: (send: ISendToServer) => void) {
	const [data, setData] = useState<IDependencyObj | IError | undefined>(undefined);

	useEffectAsync(async () => {
		const _send = await subscribe(id, (_data) => setData(_data));
		sendFactory(_send);
		return async () => unsubscribe(id);
	}, []);

	return data;
}
