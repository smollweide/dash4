/// <reference types="@types/jest" />
import { render } from '@testing-library/react';
import React from 'react';
import { Icon } from '../Icon';
import { Key, Keyboard } from './index';

describe('Keyboard', () => {
	test('exist', () => {
		expect(typeof Keyboard).toBe('function');
	});
	test('render default', () => {
		const { container } = render(
			<Keyboard>
				<Key>A</Key>
			</Keyboard>
		);
		expect(container.firstChild).toMatchSnapshot();
	});
	test('render with className', () => {
		const { container } = render(
			<Keyboard className="test">
				<Key>A</Key>
			</Keyboard>
		);
		expect(container.firstChild).toMatchSnapshot();
	});
	test('render with Icon', () => {
		const { container } = render(
			<Keyboard className="test">
				<Key>A</Key>
				<Key className="test">
					<Icon name="arrow_upward" />
				</Key>
			</Keyboard>
		);
		expect(container.firstChild).toMatchSnapshot();
	});
	test('Key standalonw', () => {
		const { container } = render(<Key>A</Key>);
		expect(container.firstChild).toMatchSnapshot();
	});
	test('Key with custom tagname', () => {
		const { container } = render(<Key tagName="div">A</Key>);
		expect(container.firstChild).toMatchSnapshot();
	});
});
