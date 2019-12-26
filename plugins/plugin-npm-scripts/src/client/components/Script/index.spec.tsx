/// <reference types="@types/jest" />
// const socketOn = jest.fn();
// const socketOff = jest.fn();
// const socketSend = jest.fn();
// const socket = jest.fn().mockResolvedValue({
// 	on: socketOn,
// 	off: socketOff,
// 	send: socketSend,
// });

const subscribeToNpmScriptDataChangesMock = jest.fn();

jest.mock('./services', () => ({
	__esModule: true, // this property makes it work
	subscribeToNpmScriptDataChanges: subscribeToNpmScriptDataChangesMock,
	unsubscribeToNpmScriptDataChanges: jest.fn(),
}));
jest.mock('@dash4/react-xterm', () => ({
	__esModule: true, // this property makes it work
	Term: () => <div />,
}));

// const setupServiceMock = (mockOverrides?: { [key: string]: any }) => {
// 	const mockedFunctions = {
// 		__esModule: true,
// 		subscribeToNpmScriptDataChanges: jest.fn(),
// 		unsubscribeToNpmScriptDataChanges: jest.fn(),
// 		...mockOverrides,
// 	};
// 	return jest.doMock('./services', () => mockedFunctions);
// };

import { fireEvent, render, waitForElement } from '@testing-library/react';
import React from 'react';
import { NpmScript, wait } from '.';

describe('PluginNpmScripts', () => {
	describe('NpmScript', () => {
		test('exist', () => {
			expect(typeof NpmScript).toBe('function');
		});
		test('render default', () => {
			const { container } = render(
				<NpmScript
					id={'1'}
					script={{
						id: '1',
						cmd: 'npm run test',
						cwd: '/path',
					}}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});
		test('open and close overlay', async () => {
			const { getByText } = render(
				<NpmScript
					id={'1'}
					script={{
						id: '1',
						cmd: 'npm run test',
						cwd: '/path',
					}}
				/>
			);
			fireEvent.click(getByText(/npm run test/i));
			const modalTitleNode = await waitForElement(() => getByText(/Terminal/i));
			await wait(200);
			expect(modalTitleNode).toMatchSnapshot();
			const closeButton = getByText('Close').parentElement;
			if (!closeButton) {
				throw new Error('close button not found');
			}
			fireEvent.click(closeButton);
		});
		test('recieve inital data', async () => {
			subscribeToNpmScriptDataChangesMock.mockImplementation(
				async (
					id: string,
					scriptId: string,
					onChange: (data: string, initial?: boolean) => void,
					onStopped: () => void
				) => {
					await wait(200);
					onChange('hallo', true);
				}
			);
			render(
				<NpmScript
					id={'1'}
					script={{
						id: '1',
						cmd: 'npm run test',
						cwd: '/path',
					}}
				/>
			);
			await wait(300);
		});
	});
});
