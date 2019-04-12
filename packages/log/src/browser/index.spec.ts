/// <reference types="@types/jest" />

import { log } from '.';

const consoleLockMock = jest.fn();
// tslint:disable-next-line
const consoleLog = console.log;
// tslint:disable-next-line
console.log = consoleLockMock;

describe('log browser', () => {
	afterAll(() => {
		// tslint:disable-next-line
		console.log = consoleLog;
	});

	test('exists', () => {
		expect(typeof log).toBe('function');
	});
	test('log', () => {
		log('browser', 'message');
		expect(consoleLockMock).toHaveBeenCalled();
	});
	test('log PascalCase', () => {
		log('PluginTerminal', 'message');
		expect(consoleLockMock).toHaveBeenCalled();
	});
});
