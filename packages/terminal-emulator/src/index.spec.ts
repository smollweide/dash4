/// <reference types="@types/jest" />
import fs from 'fs-extra';
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
				// fs.writeFileSync(path.join(process.cwd(), 'src/__mocks__/log-01.txt'), log);
				expect(log).toBe(fs.readFileSync(path.join(process.cwd(), 'src/__mocks__/log-01.txt'), 'utf8'));
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
				fs.writeFileSync(path.join(process.cwd(), 'src/__mocks__/log-02.txt'), log);
				expect(log).toBe(fs.readFileSync(path.join(process.cwd(), 'src/__mocks__/log-02.txt'), 'utf8'));
				done();
			},
		});
		term.write('node ./script-02.js\r');
	});
	test('execute-script and handle exit', async (done) => {
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
