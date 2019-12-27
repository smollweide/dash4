/// <reference types="@types/jest" />

import { terminalEmulator } from '@dash4/terminal-emulator';
import path from 'path';
import { PluginTerminal } from '.';

jest.mock('@dash4/terminal-emulator', () => ({
	__esModule: true, // this property makes it work
	// default: 'mockedDefaultExport',
	terminalEmulator: jest.fn().mockImplementation(() => {
		return {
			write: () => {
				// eslint-disable-next-line
			},
		};
	}),
}));

beforeEach(() => {
	// Clear all instances and calls to constructor and all methods:
	// @ts-ignore
	terminalEmulator.mockClear();
});
describe('PluginCodeCoverage', () => {
	test('exists', () => {
		expect(typeof PluginTerminal).toBe('function');
	});
	test('create instance', async () => {
		const inst = new PluginTerminal({
			cmd: 'hello',
		});
		inst.connected();
		expect(inst.name).toBe('PluginTerminal');
		expect(inst.lowerCaseName).toBe('plugin-terminal');
		expect(typeof inst.clientConfig.cwd).toBe('string');
		expect(inst.clientConfig.cmd).toBe('hello');
		// @ts-ignore
		expect(inst._autostart).toBe(false);
		expect(Array.isArray(inst.clientFiles)).toBe(true);
	});
	test('trigger connected without connect before', async () => {
		const inst = new PluginTerminal({
			cmd: 'hello',
		});
		// @ts-ignore
		inst.on = undefined;
		inst.connected();
	});
	test('cwd defined', async () => {
		const inst = new PluginTerminal({
			cmd: 'hello',
			cwd: 'test',
		});
		expect(inst.clientConfig.cwd).toBe(path.join(process.cwd(), 'test'));
	});
	test('autostart', async () => {
		// eslint-disable-next-line
		const inst = new PluginTerminal({
			cmd: 'hello',
			autostart: true,
		});
		expect(terminalEmulator).toHaveBeenCalledTimes(1);
	});
	test('create', async () => {
		const inst = new PluginTerminal({
			cmd: 'hello',
			autostart: true,
		});
		inst.create();
		expect(terminalEmulator).toHaveBeenCalledWith({
			// @ts-ignore
			cwd: inst._cwd,
			// @ts-ignore
			onData: inst.recieveData,
			// @ts-ignore
			onStopProcessing: inst.handleTermStopProcessing,
		});
		expect(terminalEmulator).toHaveBeenCalledTimes(2);
	});
	test('handleConnected', async () => {
		const inst = new PluginTerminal({
			cmd: 'hello',
		});
		// @ts-ignore
		const spy = jest.spyOn(inst, 'send');
		// @ts-ignore
		inst.handleConnected();
		expect(spy).toHaveBeenCalled();
		// @ts-ignore
		expect(spy).toHaveBeenCalledWith('connected', inst._terminalLog);
		spy.mockRestore();
	});
	test('handleConnected _stopProcessingTriggered', async () => {
		const inst = new PluginTerminal({
			cmd: 'hello',
		});
		// @ts-ignore
		inst._stopProcessingTriggered = true;
		// @ts-ignore
		const spy = jest.spyOn(inst, 'send');
		// @ts-ignore
		inst.handleConnected();
		expect(spy).toHaveBeenCalled();
		// @ts-ignore
		expect(spy).toHaveBeenNthCalledWith(1, 'connected', inst._terminalLog);
		expect(spy).toHaveBeenNthCalledWith(2, 'stopped');
		spy.mockRestore();
	});
	test('handleTermStopProcessing', async () => {
		const inst = new PluginTerminal({
			cmd: 'hello',
		});
		// @ts-ignore
		const spy = jest.spyOn(inst, 'send');
		// @ts-ignore
		inst.handleTermStopProcessing();
		// @ts-ignore
		expect(inst._stopProcessingTriggered).toBe(true);
		expect(spy).toHaveBeenCalled();
		expect(spy).toHaveBeenCalledWith('stopped');
		spy.mockRestore();
	});
	test('recieveData store data and send them', async () => {
		const inst = new PluginTerminal({
			cmd: 'hello',
		});
		// @ts-ignore
		const spy = jest.spyOn(inst, 'send');
		// @ts-ignore
		inst.recieveData('test');
		// @ts-ignore
		expect(inst._terminalLog).toBe('test');
		expect(spy).toHaveBeenCalledWith('recieve', 'test');

		spy.mockRestore();
	});
	test('recieveData with unavailable send method should store but not send them', async () => {
		const inst = new PluginTerminal({
			cmd: 'hello',
		});
		// @ts-ignore
		inst.send = undefined;
		// @ts-ignore
		inst.recieveData('test');
		// @ts-ignore
		expect(inst._terminalLog).toBe('test');
	});
	test('stop should kill running term process', (done) => {
		const inst = new PluginTerminal({
			cmd: 'hello',
		});
		// @ts-ignore
		inst._term = {
			kill() {
				done();
			},
		};
		// @ts-ignore
		inst.stop();
	});
	test('clean should write clean command and stored data', (done) => {
		const inst = new PluginTerminal({
			cmd: 'hello',
		});
		// @ts-ignore
		inst._term = {
			write(command: string) {
				expect(command).toBe('\x1Bc');
				done();
			},
		};
		// @ts-ignore
		expect(inst._terminalLog).toBe('');
		// @ts-ignore
		inst.clean();
	});
});
