/// <reference types="@types/jest" />
import { PluginNpmScripts } from '.';
import { IScript } from '../shared-types';

function getInstance(script?: IScript) {
	return new PluginNpmScripts({
		scripts: [
			script || {
				cmd: 'npm run test',
			},
		],
	});
}

describe('PluginNpmScripts', () => {
	test('exists', () => {
		expect(typeof PluginNpmScripts).toBe('function');
	});
	test('create instance', () => {
		const inst = getInstance();
		// @ts-ignore
		expect(inst.scripts.length).toBe(1);
		// @ts-ignore
		expect(inst.instances.length).toBe(1);
		expect(Array.isArray(inst.clientFiles)).toBe(true);
		expect(inst.clientConfig.scripts.length).toBe(1);
	});
	test('create instance with custom cwd', () => {
		const inst = getInstance({
			cmd: 'npm run test',
			cwd: '/',
		});
		// @ts-ignore
		expect(inst.scripts.length).toBe(1);
		// @ts-ignore
		expect(inst.instances.length).toBe(1);
	});
	test('connect should connect each script instance', () => {
		const inst = getInstance();
		// @ts-ignore
		inst.instances = [
			{
				connect: jest.fn(),
			} as any,
		];
		inst.connect(
			() => undefined,
			() => undefined
		);
		// @ts-ignore
		expect(inst.instances[0].connect).toHaveBeenCalled();
	});
});
