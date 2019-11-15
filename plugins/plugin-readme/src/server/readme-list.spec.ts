/// <reference types="@types/jest" />
jest.mock('fs-extra', () => ({
	__esModule: true, // this property makes it work
	default: {
		realpathSync: (pathName: string) => pathName,
		readFile: jest.fn().mockResolvedValue('# Test'),
	},
}));

import { PluginReadmeList } from '.';

describe('PluginReadmeList', () => {
	test('exists', () => {
		expect(typeof PluginReadmeList).toBe('function');
	});
	test('create instance', async () => {
		const inst = new PluginReadmeList({
			files: [
				{
					title: 'Root',
					file: 'README.md',
				},
			],
		});
		inst.connect(
			() => undefined,
			() => undefined
		);
		expect(inst.name).toBe('PluginReadmeList');
		expect(inst.lowerCaseName).toBe('plugin-readme-list');
		expect(typeof inst.clientConfig.files[0].file).toBe('string');
		expect(inst.clientConfig.files[0].height).toBe(undefined);
		expect(typeof inst.clientConfig.files[0].id).toBe('string');
		expect(inst.clientConfig.files[0].title).toBe('Root');
		expect(Array.isArray(inst.clientFiles)).toBe(true);
	});
});
