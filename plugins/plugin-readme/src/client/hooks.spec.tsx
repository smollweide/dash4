/// <reference types="@types/jest" />
import { act, renderHook } from 'react-hooks-testing-library';
jest.mock('./services', () => ({
	__esModule: true, // this property makes it work
	subscribeToReadme: jest.fn(),
	unsubscribeToReadme: jest.fn(),
}));

import { useFullscreen, useMarkdownData } from './hooks';

describe('PluginReadme', () => {
	describe('hooks', () => {
		describe('useFullscreen', () => {
			test('exist', () => {
				expect(typeof useFullscreen).toBe('function');
			});
			test('default', () => {
				const { result } = renderHook(() => useFullscreen());
				expect(result.current.fullscreen).toBe(false);
			});
			test('enable + disable', () => {
				const { result } = renderHook(() => useFullscreen());
				act(() => result.current.enableFullscreen());
				expect(result.current.fullscreen).toBe(true);
				act(() => result.current.disableFullscreen());
				expect(result.current.fullscreen).toBe(false);
			});
		});
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
