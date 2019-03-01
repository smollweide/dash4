import { IConfig } from '..';

export async function getConfig(): Promise<IConfig> {
	if (process.env.MOCK_ENV === 'true') {
		return (await import('../mock/config.json')).default;
	}
	return await (await window.fetch(`/config.json`)).json();
}
