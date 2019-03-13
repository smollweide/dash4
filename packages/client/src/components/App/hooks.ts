import { useState } from 'react';
import { IConfig } from '../..';
import { useEffectAsync } from '../../react-hooks';
import { getArePluginsRegistered } from '../../register-plugin';
import { getConfig } from '../../services/config';

const wait = (duration: number = 100) => new Promise((resolve) => setTimeout(resolve, duration));

export function useConfig() {
	const [config, setConfig] = useState<undefined | IConfig>(undefined);
	useEffectAsync(async () => {
		setConfig(await getConfig());
	}, []);

	return config;
}

export function usePluginsRegistered() {
	const [arePluginsRegistered, setArePluginsRegistered] = useState(false);
	useEffectAsync(async () => {
		const areAvailable = await getArePluginsRegistered();
		await wait(100);
		setArePluginsRegistered(areAvailable);
	}, []);

	return arePluginsRegistered;
}

export function useLoading({ config, arePluginsRegistered }: { config?: IConfig; arePluginsRegistered: boolean }) {
	const [isLoading, setIsLoading] = useState(true);
	useEffectAsync(async () => {
		if (Boolean(!config || !arePluginsRegistered)) {
			return;
		}
		setIsLoading(false);
	}, [config, arePluginsRegistered]);

	return isLoading;
}
