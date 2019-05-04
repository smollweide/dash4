/// <reference types="@types/jest" />
import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { ISendToServer } from '../shared-types';

jest.mock('@dash4/plugin-npm-scripts/build/client/components/Script', () => ({
	__esModule: true, // this property makes it work
	// default: 'mockedDefaultExport',
	NpmScript: () => <div />,
}));
const useDataMock = jest.fn();
jest.mock('./hooks', () => ({
	__esModule: true, // this property makes it work
	// default: 'mockedDefaultExport',
	useData: useDataMock,
}));
jest.mock('@dash4/log/build/browser', () => ({
	__esModule: true, // this property makes it work
	// default: 'mockedDefaultExport',
	error: jest.fn(),
	warn: jest.fn(),
	success: jest.fn(),
}));
const registerPluginMock = jest.fn();
jest.mock('@dash4/client/build/register-plugin', () => ({
	__esModule: true, // this property makes it work
	// default: 'mockedDefaultExport',
	registerPlugin: registerPluginMock,
}));

import { PluginDependencies } from './index';

const wait = (duration: number = 100) => new Promise((resolve) => setTimeout(resolve, duration));

const exampleData = {
	react: {
		version: '16.8.4',
		latestVersion: '16.8.4',
		isUpToDate: true,
		pathes: [],
		packages: [],
	},
	'react-dom': {
		version: '16.8.4',
		latestVersion: '16.8.4',
		isUpToDate: true,
		pathes: [],
		packages: [],
	},
	'@types/react': {
		version: '16.8.3',
		latestVersion: '16.8.4',
		isUpToDate: false,
		pathes: [],
		packages: [],
	},
	'@types/node': {
		version: '10.0.0',
		latestVersion: '10.0.1',
		isUpToDate: false,
		pathes: [],
		packages: [],
	},
};

const props = {
	id: '1',
	name: 'PluginDependencies',
	lowerCaseName: 'plugin-dependencies',
	dark: false,
	clientConfig: {
		cwd: './',
		installProcess: {
			id: '1',
			title: 'install',
			cwd: './',
			cmd: 'npm run install',
		},
	},
};

// if ((global as any).document) {
// 	// @ts-ignore
// 	document.createRange = () => ({
// 		setStart: () => undefined,
// 		setEnd: () => undefined,
// 		// @ts-ignore
// 		commonAncestorContainer: {
// 			nodeName: 'BODY',
// 			ownerDocument: document,
// 		},
// 	});
// }

describe('PluginTerminal', () => {
	test('exist', () => {
		expect(typeof PluginDependencies).toBe('object');
	});
	test('render loading', () => {
		useDataMock.mockImplementation((id: string, sendFactory: (send: ISendToServer) => void) => {
			sendFactory(() => undefined);
			return;
		});
		const { container } = render(<PluginDependencies {...props} />);
		expect(container.firstChild).toMatchSnapshot();
		expect(registerPluginMock).toHaveBeenCalledWith('PluginDependencies', PluginDependencies);
	});
	test('render error', () => {
		useDataMock.mockImplementation((id: string, sendFactory: (send: ISendToServer) => void) => {
			sendFactory(() => undefined);
			return {
				error: true,
				message: 'error',
			};
		});
		const { container } = render(<PluginDependencies {...props} />);
		expect(container.firstChild).toMatchSnapshot();
	});
	test('render with data', async () => {
		useDataMock.mockImplementation((id: string, sendFactory: (send: ISendToServer) => void) => {
			sendFactory(() => undefined);
			return exampleData;
		});
		const { container } = render(<PluginDependencies {...props} />);
		expect(container.firstChild).toMatchSnapshot();
		// fireEvent.click(getByTestId('1_filter-button'));
		// await wait();
		// const inputFiled = getByPlaceholderText('search') as HTMLInputElement;
		// inputFiled.value = 'react';
		// await wait();
		// expect(container.firstChild).toMatchSnapshot();
	});
});
