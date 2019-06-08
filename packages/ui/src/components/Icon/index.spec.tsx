/// <reference types="@types/jest" />
import { render } from '@testing-library/react';
import React from 'react';
import { Icon } from './index';

describe('Icon', () => {
	test('exist', () => {
		expect(typeof Icon).toBe('object');
	});
	test('render default', () => {
		const { container } = render(<Icon name="favorite" />);
		expect(container.firstChild).toMatchSnapshot();
	});
	test('render with className', () => {
		const { container } = render(<Icon className="test" name="favorite" />);
		expect(container.firstChild).toMatchSnapshot();
	});
	test('render in size s', () => {
		const { container } = render(<Icon size="s" name="favorite" />);
		expect(container.firstChild).toMatchSnapshot();
	});
	test('render in size m', () => {
		const { container } = render(<Icon size="m" name="favorite" />);
		expect(container.firstChild).toMatchSnapshot();
	});
	test('render in size l', () => {
		const { container } = render(<Icon size="l" name="favorite" />);
		expect(container.firstChild).toMatchSnapshot();
	});
	test('render in dark color', () => {
		const { container } = render(<Icon color="dark" name="favorite" />);
		expect(container.firstChild).toMatchSnapshot();
	});
	test('render in bright color', () => {
		const { container } = render(<Icon color="bright" name="favorite" />);
		expect(container.firstChild).toMatchSnapshot();
	});
	test('render with animation rotation-clockwise', () => {
		const { container } = render(<Icon animation="rotation-clockwise" name="favorite" />);
		expect(container.firstChild).toMatchSnapshot();
	});
	test('render with animation rotation-counter-clockwise', () => {
		const { container } = render(<Icon animation="rotation-counter-clockwise" name="favorite" />);
		expect(container.firstChild).toMatchSnapshot();
	});
	test('render with alignment center-in-content', () => {
		const { container } = render(<Icon align="center-in-content" name="favorite" />);
		expect(container.firstChild).toMatchSnapshot();
	});
});
