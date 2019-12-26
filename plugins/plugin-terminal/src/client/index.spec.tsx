/// <reference types="@types/jest" />

jest.mock('./services', () => ({
	__esModule: true, // this property makes it work
	// default: 'mockedDefaultExport',
	subscribeToTerminalDataChanges: jest.fn(),
	unsubscribeToTerminalDataChanges: jest.fn(),
}));
jest.mock('@dash4/react-xterm', () => ({
	__esModule: true, // this property makes it work
	default: jest.fn(),
	Term: jest.fn(),
}));

import { PluginTerminal } from './index';

describe('PluginTerminal', () => {
	test('exist', () => {
		expect(typeof PluginTerminal).toBe('function');
	});
});
