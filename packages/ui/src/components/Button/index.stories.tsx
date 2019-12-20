/// <reference types="../../types/markdown" />
import { storiesOf } from '@storybook/react';
import React from 'react';
import { Button } from '.';
import { Icon } from '../Icon';
import Readme from './README.md';

const stories = storiesOf('Button', module);
stories.add(
	'docs',
	() => (
		<div style={{ textAlign: 'center' }}>
			<Button>I'm a Button</Button>
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
		<Button>I'm a Button</Button>
	</div>
));
stories.add('with icon', () => (
	<div style={{ textAlign: 'center' }}>
		<Button>
			I'm a Button
			<Icon name="done" />
		</Button>
	</div>
));
