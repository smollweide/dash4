/// <reference types="@types/jest" />
import { PluginActions } from '.';

// tslint:disable-next-line
const consoleLog = console.log;
// tslint:disable-next-line
console.log = () => undefined;

describe('PluginActions', () => {
	afterAll(() => {
		// tslint:disable-next-line
		console.log = consoleLog;
	});

	test('exists', () => {
		expect(typeof PluginActions).toBe('function');
	});
	test('create instance', async () => {
		const inst = new PluginActions({
			title: 'Test',
			actions: [
				{
					type: 'link' as 'link',
					href: 'http://localhost:6006',
					title: 'Storybook',
					image: 'https://storybook.js.org/images/logos/icon-storybook.png',
				},
			],
		});
		expect(inst.clientConfig.title).toBe('Test');
		expect(inst.clientConfig.actions.length).toBe(1);
		expect(inst.clientConfig.actions[0].href).toBe('http://localhost:6006');
		expect(typeof inst.clientConfig.actions[0].id).toBe('string');
		expect(inst.clientFiles.length).toBe(1);
		expect(inst.clientFiles[0].includes('plugins/plugin-actions/dist/plugins/plugin-actions/main.js')).toBe(true);
		// make sure connet is overritten
		expect(typeof inst.connect).toBe('function');
	});
	test('create instance without options', async () => {
		const inst = new PluginActions();
		expect(inst.clientConfig.title).toBe(undefined);
		expect(inst.clientConfig.actions.length).toBe(0);
	});
});
