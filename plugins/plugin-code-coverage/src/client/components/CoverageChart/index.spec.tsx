/// <reference types="@types/jest" />
import { render } from '@testing-library/react';
import React from 'react';
import 'react-dom';
import CoverageChart from './index';

describe('CoverageChart', () => {
	test('coverage danger', () => {
		const rendered = render(<CoverageChart title="title" coverage={10} threshold={[20, 50]} />);
		expect(rendered.container.firstChild).toMatchSnapshot();
	});

	test('coverage warning', () => {
		const rendered = render(<CoverageChart title="title" coverage={30} threshold={[20, 50]} />);
		expect(rendered.container.firstChild).toMatchSnapshot();
	});

	test('coverage success', () => {
		const rendered = render(<CoverageChart title="title" coverage={50} threshold={[20, 50]} />);
		expect(rendered.container.firstChild).toMatchSnapshot();
	});

	test('dark', () => {
		const rendered = render(<CoverageChart dark title="title" coverage={50} threshold={[20, 50]} />);
		expect(rendered.container.firstChild).toMatchSnapshot();
	});
});
