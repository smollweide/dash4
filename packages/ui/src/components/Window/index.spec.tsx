/// <reference types="@types/jest" />
import React from 'react';
import { render } from 'react-testing-library';
import { Window, WindowBody, WindowHeader } from './index';

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
});
