import { renderHook } from 'react-hooks-testing-library';
jest.mock('./services', () => ({
	__esModule: true, // this property makes it work
	subscribe: jest.fn(),
	unsubscribe: jest.fn(),
}));
const subscribeMock = jest.fn();

jest.mock('./services', () => ({
	__esModule: true, // this property makes it work
	// default: 'mockedDefaultExport',
	subscribe: subscribeMock,
	unsubscribe: jest.fn(),
}));

import { useData } from './hooks';

describe('PluginDependencies', () => {
	describe('hooks', () => {
		describe('useData', () => {
			test('exist', () => {
				expect(typeof useData).toBe('function');
			});
			test('default', () => {
				const sendMock = jest.fn();
				subscribeMock.mockImplementation(async (name: string, cb: (data: string) => void) => {
					cb('test');
					return () => undefined;
				});
				const { result } = renderHook(() => useData('1', () => undefined));
				expect(result.current).toBe('test');
			});
		});
	});
});
