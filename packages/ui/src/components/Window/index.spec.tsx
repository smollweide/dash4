/// <reference types="@types/jest" />
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { act, renderHook } from 'react-hooks-testing-library';
import { useFullscreen, Window } from './index';

const useKeyMock = jest.fn();

jest.mock('@rooks/use-key', () => ({
	__esModule: true,
	default: (...args: any[]) => useKeyMock(...args),
}));

describe('Window', () => {
	test('exist', () => {
		expect(typeof Window).toBe('object');
	});
	test('render default', () => {
		const { container } = render(<Window>Hello</Window>);
		expect(container.firstChild).toMatchSnapshot();
	});
	test('render with className', () => {
		const { container } = render(<Window className="test">Hello</Window>);
		expect(container.firstChild).toMatchSnapshot();
	});
	test('render dark', () => {
		const { container } = render(<Window dark>Hello</Window>);
		expect(container.firstChild).toMatchSnapshot();
	});
	test('render fullscreen', () => {
		const { container } = render(<Window fullscreen>Hello</Window>);
		expect(container.firstChild).toMatchSnapshot();
	});
	test('render !autoStretch', () => {
		const { container } = render(<Window autoStretch={false}>Hello</Window>);
		expect(container.firstChild).toMatchSnapshot();
	});
	test('onWillLeaveFullscreen', () => {
		const { container } = render(
			<Window onWillLeaveFullscreen={() => undefined} autoStretch={false}>
				Hello
			</Window>
		);
		expect(container.firstChild).toMatchSnapshot();
	});
	test('press key esc', (done) => {
		useKeyMock.mockImplementation((keys, cb) => {
			expect(keys).toEqual([27]);
			cb();
		});

		render(
			<Window
				onWillLeaveFullscreen={() => {
					done();
				}}
				autoStretch={false}
			>
				Hello
			</Window>
		);
		expect(useKeyMock).toHaveBeenCalled();
	});
	test('focus', (done) => {
		const { container } = render(
			<Window
				onFocus={() => {
					done();
				}}
				autoStretch={false}
			>
				Hello
			</Window>
		);
		// @ts-ignore
		fireEvent.focus(container.firstChild);
		// @ts-ignore
		expect(container.firstChild).toHaveAttribute('tabindex');
	});
	test('focus without cb', () => {
		const { container } = render(<Window autoStretch={false}>Hello</Window>);
		// @ts-ignore
		fireEvent.focus(container.firstChild);
		// @ts-ignore
		expect(container.firstChild).toHaveAttribute('tabindex');
	});
	test('blur', (done) => {
		const { container } = render(
			<Window
				onBlur={() => {
					done();
				}}
				autoStretch={false}
			>
				Hello
			</Window>
		);
		// @ts-ignore
		fireEvent.focus(container.firstChild);
		// @ts-ignore
		fireEvent.blur(container.firstChild);
	});
	test('blur without cb', () => {
		const { container } = render(<Window autoStretch={false}>Hello</Window>);
		// @ts-ignore
		fireEvent.focus(container.firstChild);
		// @ts-ignore
		fireEvent.blur(container.firstChild);
	});
	test('press key esc without defined callback', (done) => {
		useKeyMock.mockImplementation((keys, cb) => {
			expect(keys).toEqual([27]);
			cb();
			done();
		});
		render(<Window autoStretch={false}>Hello</Window>);
		expect(useKeyMock).toHaveBeenCalled();
	});

	describe('useFullscreen', () => {
		test('exist', () => {
			expect(typeof useFullscreen).toBe('function');
		});
		test('default', () => {
			const { result } = renderHook(() => useFullscreen());
			expect(typeof result.current.disableFullscreen).toBe('function');
			expect(typeof result.current.enableFullscreen).toBe('function');
			expect(typeof result.current.toggleFullscreen).toBe('function');
			expect(result.current.fullscreen).toBe(false);
			act(() => result.current.enableFullscreen());
			expect(result.current.fullscreen).toBe(true);
			act(() => result.current.disableFullscreen());
			expect(result.current.fullscreen).toBe(false);
			act(() => result.current.toggleFullscreen());
			expect(result.current.fullscreen).toBe(true);
		});
	});
});
