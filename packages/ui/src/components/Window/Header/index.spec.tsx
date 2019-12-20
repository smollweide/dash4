/// <reference types="@types/jest" />
import { render } from '@testing-library/react';
import React from 'react';
import { WindowHeader } from './index';

describe('WindowHeader', () => {
	test('exist', () => {
		expect(typeof WindowHeader).toBe('function');
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
