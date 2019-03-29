/// <reference types="@types/jest" />
jest.mock('./services', () => ({
	__esModule: true, // this property makes it work
	// default: 'mockedDefaultExport',
	subscribeToTerminalDataChanges: jest.fn(),
	unsubscribeToTerminalDataChanges: jest.fn(),
}));

import { PluginTerminal } from './index';

describe('PluginTerminal', () => {
	test('exist', () => {
		expect(typeof PluginTerminal).toBe('object');
	});
});
