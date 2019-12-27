/// <reference types="@types/jest" />
jest.mock('./services', () => ({
	__esModule: true, // this property makes it work
	subscribeToReadme: jest.fn(),
	unsubscribeToReadme: jest.fn(),
}));

const consoleLog = console.log;
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

console.log = consoleLog;
