/// <reference types="../../types/markdown" />
import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import { ErrorBoundary } from '.';
import Readme from './README.md';

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

const stories = storiesOf('ErrorBoundary', module);
stories.add(
	'docs',
	() => (
		<div style={{ maxWidth: 420, margin: '0 auto' }}>
			<ErrorBoundary title="Error boundary title" message="Custom message placed here">
				<BuggyCounter initialCounter="0" />
			</ErrorBoundary>
		</div>
	),
	{
		readme: {
			content: Readme,
		},
	}
);
stories.add('default', () => (
	<ErrorBoundary>
		<BuggyCounter initialCounter="0" />
	</ErrorBoundary>
));
stories.add('custom title', () => (
	<ErrorBoundary title="Custom title">
		<BuggyCounter initialCounter="0" />
	</ErrorBoundary>
));
stories.add('custom message', () => (
	<ErrorBoundary message="Custom message">
		<BuggyCounter initialCounter="0" />
	</ErrorBoundary>
));
