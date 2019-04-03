/// <reference types="@types/jest" />
import { PluginNpmScript } from './plugin-npm-script';

function getInstance() {
	return new PluginNpmScript({
		id: '1',
		script: {
			cmd: 'npm run test',
			id: '1.1',
			cwd: '/',
		},
	});
}

describe('PluginNpmScript', () => {
	test('exists', () => {
		expect(typeof PluginNpmScript).toBe('function');
	});
	test('create instance', async () => {
		const inst = getInstance();
		const onMock = jest.fn();
		const sendMock = jest.fn();
		inst.connect(onMock, sendMock);
		// @ts-ignore
		expect(onMock).toHaveBeenNthCalledWith(1, 'plugin-npm-scripts-1-1.1_connected', inst.handleConnected);

		expect(onMock).toHaveBeenNthCalledWith(
			2,
			'plugin-npm-scripts-1-1.1_request-terminal-data',
			// @ts-ignore
			inst.handleRequestData
		);
		// @ts-ignore
		expect(onMock).toHaveBeenNthCalledWith(3, 'plugin-npm-scripts-1-1.1_start', inst.start);
		// @ts-ignore
		expect(onMock).toHaveBeenNthCalledWith(4, 'plugin-npm-scripts-1-1.1_stop', inst.stop);
		// @ts-ignore
		expect(onMock).toHaveBeenNthCalledWith(5, 'plugin-npm-scripts-1-1.1_clean', inst.clean);
	});
	test('connect with invalid on', async () => {
		const inst = getInstance();
		const onMock = undefined;
		const sendMock = jest.fn();
		// @ts-ignore
		inst.connect(onMock, sendMock);
	});
	test('handleRequestData', async () => {
		const inst = getInstance();
		const onMock = jest.fn();
		const sendMock = jest.fn();
		inst.connect(onMock, sendMock);
		// @ts-ignore
		inst.handleRequestData();
		expect(sendMock).toHaveBeenCalledWith('plugin-npm-scripts-1-1.1_recieve', '');
	});
	test('handleConnected', async () => {
		const inst = getInstance();
		const onMock = jest.fn();
		const sendMock = jest.fn();
		inst.connect(onMock, sendMock);
		// @ts-ignore
		inst.handleConnected();
		expect(sendMock).toHaveBeenCalledWith('plugin-npm-scripts-1-1.1_connected', '');
	});
	test('handleConnected with stopped process', async () => {
		const inst = getInstance();
		const onMock = jest.fn();
		const sendMock = jest.fn();
		inst.connect(onMock, sendMock);
		// @ts-ignore
		inst.stopProcessingTriggered = true;
		// @ts-ignore
		inst.handleConnected();
		expect(sendMock).toHaveBeenNthCalledWith(1, 'plugin-npm-scripts-1-1.1_connected', '');
		expect(sendMock).toHaveBeenNthCalledWith(2, 'plugin-npm-scripts-1-1.1_stopped', undefined);
	});
	test('handleRecieveData', async () => {
		const inst = getInstance();
		const onMock = jest.fn();
		const sendMock = jest.fn();
		inst.connect(onMock, sendMock);
		// @ts-ignore
		inst.terminalLog = 'initial data';
		// @ts-ignore
		inst.handleRecieveData('test data');
		// @ts-ignore
		expect(inst.terminalLog).toBe('initial datatest data');
		expect(sendMock).toHaveBeenCalledWith('plugin-npm-scripts-1-1.1_recieve', 'test data');
	});
	test('create new emulated terminal instance', async () => {
		const inst = getInstance();
		// @ts-ignore
		inst.create();
		// @ts-ignore
		expect(typeof inst.term).toBe('object');
	});
	test('try to create new emulated while an instance is currently running', async () => {
		const inst = getInstance();
		// @ts-ignore
		inst.create();
		// @ts-ignore
		expect(typeof inst.term).toBe('object');
		// @ts-ignore
		expect(inst.create()).toBe(false);
	});
	test('handle terminal process stopped', async () => {
		const inst = getInstance();
		const onMock = jest.fn();
		const sendMock = jest.fn();
		inst.connect(onMock, sendMock);
		// @ts-ignore
		inst.handleTerminalProcessStopped();
		expect(sendMock).toHaveBeenCalledWith('plugin-npm-scripts-1-1.1_stopped', undefined);
	});
	describe('stop process', () => {
		test('should do nothing when terminal is not running', () => {
			const inst = getInstance();
			// @ts-ignore
			expect(inst.stop()).toBe(undefined);
		});
		test('should kill running terminal, remove class variable and re-create terminal', () => {
			const inst = getInstance();
			// @ts-ignore
			inst.create();
			const termMock = {
				kill: jest.fn(),
			};
			// @ts-ignore
			const spy = jest.spyOn(inst, 'create');
			// @ts-ignore
			inst.term = termMock;
			// @ts-ignore
			inst.stop();
			expect(termMock.kill).toBeCalled();
			expect(spy).toBeCalled();
		});
	});
	describe('clean process', () => {
		test('should do nothing when terminal is not running', () => {
			const inst = getInstance();
			// @ts-ignore
			expect(inst.clean()).toBe(undefined);
		});
		test('should write clean command and clean class variable', () => {
			const inst = getInstance();
			// @ts-ignore
			inst.create();
			const termMock = {
				write: jest.fn(),
			};
			// @ts-ignore
			inst.term = termMock;
			// @ts-ignore
			inst.clean();
			expect(termMock.write).toBeCalledWith('\x1Bc');
			// @ts-ignore
			expect(inst.terminalLog).toBe('');
		});
	});
	describe('start process', () => {
		test('should create a new terminal instance if no terminal is running', async () => {
			const inst = getInstance();
			// @ts-ignore
			const spy = jest.spyOn(inst, 'create');
			// @ts-ignore
			expect(await inst.start()).toBe(undefined);
			expect(spy).toBeCalled();
		});
		test('should write command', async () => {
			const inst = getInstance();
			const termMock = {
				write: jest.fn(),
			};
			// @ts-ignore
			inst.term = termMock;
			// @ts-ignore
			await inst.start();
			// @ts-ignore
			expect(termMock.write).toBeCalledWith(`${inst.script.cmd}\r`);
		});
	});
});
