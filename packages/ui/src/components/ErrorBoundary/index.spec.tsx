/// <reference types="@types/jest" />
import React, { useState } from 'react';
import { render } from 'react-testing-library';
import { ErrorBoundary } from './index';

function BuggyCounter({ initialCounter = 0 }: { initialCounter: any }) {
	const [counter, setCounter] = useState(initialCounter);

	function handleClick() {
		setCounter(counter + 1);
	}

	if (typeof counter !== 'number') {
		// Simulate a JS error
		throw new Error('counter have to be a number type');
	}

	return <h1 onClick={handleClick}>{counter}</h1>;
}

describe('ErrorBoundary', () => {
	test('exist', () => {
		expect(typeof ErrorBoundary).toBe('object');
	});
	test('render default', () => {
		// tslint:disable-next-line
		const consoleError = console.error;
		// tslint:disable-next-line
		console.error = () => {};
		const { container } = render(
			<ErrorBoundary>
				<BuggyCounter initialCounter="0" />
			</ErrorBoundary>
		);
		expect(container.firstChild).toThrowErrorMatchingSnapshot();
		// tslint:disable-next-line
		console.error = consoleError;
	});
	test('render error with custom title', () => {
		// tslint:disable-next-line
		const consoleError = console.error;
		// tslint:disable-next-line
		console.error = () => {};
		const { container } = render(
			<ErrorBoundary title="cunstom title">
				<BuggyCounter initialCounter="0" />
			</ErrorBoundary>
		);
		expect(container.firstChild).toThrowErrorMatchingSnapshot();
		// tslint:disable-next-line
		console.error = consoleError;
	});
	test('render error with custom message', () => {
		// tslint:disable-next-line
		const consoleError = console.error;
		// tslint:disable-next-line
		console.error = () => {};
		const { container } = render(
			<ErrorBoundary message="cunstom message">
				<BuggyCounter initialCounter="0" />
			</ErrorBoundary>
		);
		expect(container.firstChild).toThrowErrorMatchingSnapshot();
		// tslint:disable-next-line
		console.error = consoleError;
	});
});
