/// <reference types="@types/jest" />
import React from 'react';
import { render } from 'react-testing-library';
import { WindowHeader } from './index';

describe('WindowHeader', () => {
	test('exist', () => {
		expect(typeof WindowHeader).toBe('object');
	});
	test('render default', () => {
		const { container } = render(<WindowHeader title="title">Hello</WindowHeader>);
		expect(container.firstChild).toMatchSnapshot();
	});
	test('render with subtitle', () => {
		const { container } = render(
			<WindowHeader title="title" subTitle="subtitle">
				Hello
			</WindowHeader>
		);
		expect(container.firstChild).toMatchSnapshot();
	});
	test('render progressing', () => {
		const { container } = render(
			<WindowHeader progressing title="title" subTitle="subtitle">
				Hello
			</WindowHeader>
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
