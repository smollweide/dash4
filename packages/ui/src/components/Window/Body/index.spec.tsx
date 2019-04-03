/// <reference types="@types/jest" />
import React from 'react';
import { render } from 'react-testing-library';
import { WindowBody } from './index';

describe('WindowBody', () => {
	test('exist', () => {
		expect(typeof WindowBody).toBe('object');
	});
	test('render default', () => {
		const { container } = render(<WindowBody>Hello</WindowBody>);
		expect(container.firstChild).toMatchSnapshot();
	});
});
