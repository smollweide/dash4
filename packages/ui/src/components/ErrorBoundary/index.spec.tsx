/// <reference types="@types/jest" />
import { render } from '@testing-library/react';
import React, { useState } from 'react';
import { ErrorBoundary } from './index';

function BuggyCounter({ initialCounter = 0 }: { initialCounter: any }) {
	const [counter, setCounter] = useState(initialCounter as number);

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
		expect(typeof ErrorBoundary).toBe('function');
	});
	test('render default', () => {
		const consoleError = console.error;
		console.error = () => {};
		const { container } = render(
			<ErrorBoundary>
				<BuggyCounter initialCounter="0" />
			</ErrorBoundary>
		);
		expect(container.firstChild).toThrowErrorMatchingSnapshot();
		console.error = consoleError;
	});
	test('render error with custom title', () => {
		const consoleError = console.error;
		console.error = () => {};
		const { container } = render(
			<ErrorBoundary title="cunstom title">
				<BuggyCounter initialCounter="0" />
			</ErrorBoundary>
		);
		expect(container.firstChild).toThrowErrorMatchingSnapshot();
		console.error = consoleError;
	});
	test('render error with custom message', () => {
		const consoleError = console.error;
		console.error = () => {};
		const { container } = render(
			<ErrorBoundary message="cunstom message">
				<BuggyCounter initialCounter="0" />
			</ErrorBoundary>
		);
		expect(container.firstChild).toThrowErrorMatchingSnapshot();
		console.error = consoleError;
	});
});
