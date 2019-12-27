/// <reference types="@types/jest" />

import { log } from '.';

const consoleLockMock = jest.fn();
// eslint-disable-next-line
const consoleLog = console.log;
// eslint-disable-next-line
console.log = consoleLockMock;

describe('log browser', () => {
	afterAll(() => {
		// eslint-disable-next-line
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
