/// <reference types="@types/jest" />
import { render } from '@testing-library/react';
import React from 'react';
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
