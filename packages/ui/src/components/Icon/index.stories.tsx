/// <reference types="../../types/markdown" />
import { storiesOf } from '@storybook/react';
import React from 'react';
import { alignMap, animationMap, colorMap, Icon, sizeMap, TAlign, TAnimation, TColor, TSize } from '.';
import Readme from './README.md';

const stories = storiesOf('Icon', module);
stories.add(
	'docs',
	() => (
		<div style={{ textAlign: 'center' }}>
			<Icon name="play_arrow" />
			<Icon name="favorite" />
			<Icon name="bookmark_border" />
		</div>
	),
	{
		readme: {
			content: Readme,
		},
	}
);
stories.add('default', () => <Icon name="play_arrow" />);
Object.keys(sizeMap).forEach((size) => {
	stories.add(`size ${size}`, () => <Icon name="play_arrow" size={size as TSize} />);
});
Object.keys(colorMap).forEach((color) => {
	stories.add(`color ${color}`, () => (
		<>
			<style>{`body { background: #ccc; }`}</style>
			<Icon name="play_arrow" color={color as TColor} />
		</>
	));
});
Object.keys(alignMap).forEach((align) => {
	stories.add(`align ${align}`, () => (
		<div style={{ width: '100vw', height: '100vh' }}>
			<Icon name="play_arrow" align={align as TAlign} />
		</div>
	));
});
Object.keys(animationMap).forEach((animation) => {
	stories.add(`animation ${animation}`, () => <Icon name="cached" animation={animation as TAnimation} />);
});
