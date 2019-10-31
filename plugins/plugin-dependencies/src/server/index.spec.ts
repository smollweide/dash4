/// <reference types="@types/jest" />

const getDetailedLernaPackgesMock = jest.fn().mockImplementation(async () => {
	return {
		'/packages/cli/package.json': {
			path: '/packages/cli',
			name: '@dash4/cli',
			packageData: {
				version: '0.2.1',
			},
		},
		'/packages/log/package.json': {
			path: '/packages/log',
			name: '@dash4/log',
			packageData: {
				version: '0.2.1',
			},
		},
	};
});

jest.mock('./lerna', () => ({
	__esModule: true,
	detailed: getDetailedLernaPackgesMock,
}));

import { PluginDependencies } from '.';

// tslint:disable-next-line
const consoleLog = console.log;
// tslint:disable-next-line
console.log = () => undefined;

describe('PluginDependencies', () => {
	afterAll(() => {
		// tslint:disable-next-line
		console.log = consoleLog;
	});

	test('exists', () => {
		expect(typeof PluginDependencies).toBe('function');
	});
	test('create instance', async () => {
		const inst = new PluginDependencies();
		inst.connect(() => undefined, () => undefined);
		expect(inst.name).toBe('PluginDependencies');
		expect(inst.lowerCaseName).toBe('plugin-dependencies');
		expect(typeof inst.clientConfig.cwd).toBe('string');
		expect(inst.clientConfig.title).toBe(undefined);
		expect(typeof inst.clientConfig.installProcess.cwd).toBe('string');
		expect(inst.clientConfig.installProcess.cmd).toBe('npm run install');
		expect(inst.clientConfig.installProcess.title).toBe('npm run install');
	});
	test('create instance with custom cwd', async () => {
		const inst = new PluginDependencies({
			cwd: '/custom/dir',
		});
		expect(inst.clientConfig.cwd.includes('/custom/dir')).toBe(true);
	});
	test('get clientFiles', async () => {
		const inst = new PluginDependencies();
		expect(Array.isArray(inst.clientFiles)).toBe(true);
		expect(inst.clientFiles[0].includes('/plugin-dependencies/main.js')).toBe(true);
	});
	test.skip('fetchLernaPackages', async () => {
		const inst = new PluginDependencies({
			lerna: '../../lerna.json',
		});
		// @ts-ignore
		await inst.fetchLernaPackages();
		// @ts-ignore
		expect(inst._packages).toEqual([
			{ name: 'root', path: './' },
			{ name: '@dash4/cli', path: '/packages/cli' },
			{ name: '@dash4/log', path: '/packages/log' },
		]);
		// @ts-ignore
		expect(inst._exclude).toEqual([/^@dash4\/cli/, /^@dash4\/log/]);
	});
	test.skip('fetchLernaPackages with error', async () => {
		getDetailedLernaPackgesMock.mockImplementation(() => {
			throw new Error('error');
		});

		const inst = new PluginDependencies({
			lerna: '../../lerna.json',
		});

		// @ts-ignore
		await inst.fetchLernaPackages();
		// @ts-ignore
		expect(inst._packages).toEqual([{ name: 'root', path: './' }]);
		// @ts-ignore
		expect(inst._exclude).toEqual([]);
	});
});
