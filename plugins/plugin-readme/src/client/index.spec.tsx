/// <reference types="@types/jest" />
jest.mock('./services', () => ({
	__esModule: true, // this property makes it work
	subscribeToReadme: jest.fn(),
	unsubscribeToReadme: jest.fn(),
}));

// tslint:disable-next-line
const consoleLog = console.log;
// tslint:disable-next-line
console.log = () => {};

import { Readme } from './components/Readme';
import { ReadmeList } from './components/ReadmeList';
import './index';

describe('PluginReadme', () => {
	describe('index', () => {
		test('PluginReadme registered', () => {
			expect((window as any).dash4.plugins.PluginReadme).toBe(Readme);
		});
		test('PluginReadmeList registered', () => {
			expect((window as any).dash4.plugins.PluginReadmeList).toBe(ReadmeList);
		});
	});
});

// tslint:disable-next-line
console.log = consoleLog;
