/// <reference types="@types/jest" />
import { renderHook } from 'react-hooks-testing-library';
jest.mock('./services', () => ({
	__esModule: true, // this property makes it work
	subscribeToReadme: jest.fn(),
	unsubscribeToReadme: jest.fn(),
}));

import { useMarkdownData } from './hooks';

describe('PluginReadme', () => {
	describe('hooks', () => {
		describe('useMarkdownData', () => {
			test('exist', () => {
				expect(typeof useMarkdownData).toBe('function');
			});
			test('default', () => {
				const { result } = renderHook(() => useMarkdownData('1'));
				expect(result.current).toBe('');
			});
		});
	});
});
