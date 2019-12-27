/// <reference types="@types/jest" />
import path from 'path';
import { terminalEmulator } from '.';

describe('terminalEmulator', () => {
	test('exists', () => {
		expect(typeof terminalEmulator).toBe('function');
	});
	test('execute-script and detect end of execution', (done) => {
		let log = '';
		const term = terminalEmulator({
			cwd: path.join(process.cwd(), 'src/__mocks__'),
			onData: (data) => {
				log += data;
			},
			onStopProcessing: () => {
				expect(log.includes('hello')).toBe(true);
				term.kill();
				done();
			},
		});
		term.write('node ./script-01.js\r');
	});
	test('execute-script and stop on error', (done) => {
		let log = '';
		const term = terminalEmulator({
			cwd: path.join(process.cwd(), 'src/__mocks__'),
			onData: (data) => {
				log += data;
			},
			onStopProcessing: () => {
				expect(log.includes('new Error')).toBe(true);
				term.kill();
				done();
			},
		});
		term.write('node ./script-02.js\r');
	});
	test('execute-script and handle exit', (done) => {
		let log = '';
		const term = terminalEmulator({
			cwd: path.join(process.cwd(), 'src/__mocks__'),
			onData: (data) => (log += data),
			onExit: () => {
				done();
			},
		});

		term.write('node ./script-01.js\r');
		term.kill();
	});
});
