/// <reference types="../../types/markdown" />
import { storiesOf } from '@storybook/react';
import React from 'react';
import { Key, Keyboard } from '.';
import { Icon } from '../Icon';
import Readme from './README.md';

const stories = storiesOf('Keyboard', module);
stories.add(
	'docs',
	() => (
		<div style={{ textAlign: 'center' }}>
			<Keyboard>
				<Key>Ctrl</Key>
				<Key>
					<Icon name="arrow_upward" />
				</Key>
				<Key>A</Key>
			</Keyboard>
		</div>
	),
	{
		readme: {
			content: Readme,
		},
	}
);
stories.add('default', () => (
	<div style={{ textAlign: 'center' }}>
		<Keyboard>
			<Key>Ctrl</Key>
			<Key>A</Key>
		</Keyboard>
	</div>
));
stories.add('with icon', () => (
	<div style={{ textAlign: 'center' }}>
		<Keyboard>
			<Key>Ctrl</Key>
			<Key>
				<Icon name="arrow_upward" />
			</Key>
			<Key>A</Key>
		</Keyboard>
	</div>
));
stories.add('enter', () => (
	<div style={{ textAlign: 'center' }}>
		<Keyboard>
			<Key>↵</Key>
		</Keyboard>
	</div>
));
