/// <reference types="@types/jest" />

import { error, info, log, spinner, success, warn } from '.';
import { toParamCase } from './shared';

jest.mock('chalk', () => ({
	__esModule: true,
	default: {
		white: (text: string) => text,
		red: (text: string) => text,
		blue: (text: string) => text,
		bgBlack: (text: string) => text,
		hex: (value: string) => (text: string) => text,
	},
}));

const oraStartMock = jest.fn();
const oraFailMock = jest.fn();
const oraSucceedMock = jest.fn();
const oraWarnMock = jest.fn();
const oraInfoMock = jest.fn();
const oraTextMock = '';

const oraMock = {
	start: oraStartMock,
	fail: oraFailMock,
	succeed: oraSucceedMock,
	warn: oraWarnMock,
	info: oraInfoMock,
	_text: '',
	get text() {
		return this._text;
	},
	set text(value: string) {
		this._text = value;
	},
	_color: '',
	get color() {
		return this._color;
	},
	set color(value: string) {
		this._color = value;
	},
};

jest.mock('ora', () => ({
	__esModule: true,
	default: () => oraMock,
}));

const consoleLockMock = jest.fn();
// tslint:disable-next-line
const consoleLog = console.log;
// tslint:disable-next-line
console.log = consoleLockMock;

describe('log', () => {
	afterAll(() => {
		// tslint:disable-next-line
		console.log = consoleLog;
	});

	test('exists', () => {
		expect(typeof log).toBe('function');
	});
	test('log', () => {
		log('server', 'message');
		expect(consoleLockMock).toHaveBeenCalledWith('(Dash4 server) message');
	});
	test('log PascalCase', () => {
		log('PluginTerminal', 'message');
		expect(consoleLockMock).toHaveBeenCalledWith('(Dash4 plugin-terminal) message');
	});
	test('info', () => {
		info('server', 'message');
		expect(consoleLockMock).toHaveBeenCalledWith('(Dash4 server) message');
	});
	test('success', () => {
		success('server', 'message');
		expect(consoleLockMock).toHaveBeenCalledWith('(Dash4 server) message');
	});
	test('error', () => {
		error('server', 'message');
		expect(consoleLockMock).toHaveBeenCalledWith('(Dash4 server) message');
	});
	test('warn', () => {
		warn('server', 'message');
		expect(consoleLockMock).toHaveBeenCalledWith('(Dash4 server) message');
	});
	test('spinner', () => {
		const spin = spinner('server', 'load content');
		expect(typeof spin.succeed).toBe('function');

		spin.start();
		expect(oraStartMock).toHaveBeenCalled();

		spin.fail('error text');
		expect(oraFailMock).toHaveBeenCalledWith('(Dash4 server) error text');

		spin.succeed('succeed text');
		expect(oraSucceedMock).toHaveBeenCalledWith('(Dash4 server) succeed text');

		spin.warn('warn text');
		expect(oraWarnMock).toHaveBeenCalledWith('(Dash4 server) warn text');

		spin.info('info text');
		expect(oraInfoMock).toHaveBeenCalledWith('(Dash4 server) info text');

		const spyText = jest.spyOn(oraMock, 'text', 'set');
		spin.text('text');
		expect(spyText).toHaveBeenCalledWith('(Dash4 server) text');

		const spyColor = jest.spyOn(oraMock, 'color', 'set');
		spin.type('success');
		expect(spyColor).toHaveBeenCalledWith('green');
	});
	test('spinner with given type', () => {
		const spin = spinner('server', 'load content', 'error');
		expect(typeof spin.fail).toBe('function');

		spin.start();
		expect(oraStartMock).toHaveBeenCalled();
	});
	test('spinner with given invlaid type', () => {
		// @ts-ignore
		const spin = spinner('server', 'load content', 'bla');
		expect(typeof spin.fail).toBe('function');

		spin.start();
		expect(oraStartMock).toHaveBeenCalled();
	});
	test('toParamCase', () => {
		expect(toParamCase('PluginTerminal')).toBe('plugin-terminal');
		expect(toParamCase('Server')).toBe('server');
		expect(toParamCase('server')).toBe('server');
	});
});
