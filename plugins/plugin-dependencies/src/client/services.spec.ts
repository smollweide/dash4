/// <reference types="@types/jest" />

const socketMock = jest.fn();

jest.mock('@dash4/client/build/socket', () => ({
	__esModule: true, // this property makes it work
	// default: 'mockedDefaultExport',
	socket: socketMock,
}));

import { subscribe, unsubscribe } from './services';

describe('subscribe', () => {
	test('exist', () => {
		expect(typeof subscribe).toBe('function');
	});
	test('subscribe should send connected', async () => {
		const onMock = jest.fn();
		const sendMock = jest.fn();
		socketMock.mockImplementation(async () => {
			return { on: onMock, send: sendMock };
		});
		await subscribe('1', () => undefined);
		expect(onMock).toHaveBeenCalled();
		expect(sendMock).toHaveBeenCalledWith('plugin-dependencies-1_connected', undefined);
	});
	test('recieve data', async () => {
		const sendMock = jest.fn();
		socketMock.mockImplementation(async () => {
			return {
				on: (name: string, cb: (data: string) => void) => {
					cb('test');
				},
				send: sendMock,
			};
		});
		const recieveMock = jest.fn();
		await subscribe('1', recieveMock);
		expect(recieveMock).toHaveBeenCalledWith('test');
	});
	test('unsubscribe should cut off connections', async () => {
		const offMock = jest.fn();
		socketMock.mockImplementation(async () => {
			return { off: offMock };
		});
		await unsubscribe('1');
		expect(offMock).toHaveBeenCalledWith('plugin-dependencies-1_data');
	});
});
