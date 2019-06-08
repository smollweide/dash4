// /// <reference types="@types/jest" />
import { render } from '@testing-library/react';
import React from 'react';
import { PluginActions } from './index';

jest.mock('@dash4/log/build/browser', () => ({
	__esModule: true, // this property makes it work
	// default: 'mockedDefaultExport',
	error: jest.fn(),
	warn: jest.fn(),
	success: jest.fn(),
}));

const configLink = {
	actions: [
		{
			id: '1',
			type: 'link' as 'link',
			href: 'http://localhost:6006',
			title: 'Storybook',
			image: 'https://storybook.js.org/images/logos/icon-storybook.png',
		},
		{
			id: '2',
			type: 'link' as 'link',
			href: 'http://localhost:6008',
			title: 'Development environment',
			icon: 'compare',
		},
		{
			id: '3',
			type: 'link' as 'link',
			href: 'http://localhost:6009',
			title: 'Staging environment',
			icon: 'devices',
		},
	],
};
const configTeaser = {
	actions: [
		{
			id: 'teaser-1',
			type: 'teaser' as 'teaser',
			href: 'http://localhost:6006',
			title: 'Storybook',
			subtitle:
				'Build bulletproof UI components faster. Storybook is an open source tool for developing UI components in isolation for React, Vue, and Angular. It makes building stunning UIs organized and efficient.',
			image: 'https://storybook.js.org/images/logos/icon-storybook.png',
			link: configLink.actions[0],
		},
		{
			id: 'teaser-2',
			type: 'teaser' as 'teaser',
			href: 'http://localhost:6006',
			title: 'Storybook',
			subtitle:
				'Build bulletproof UI components faster. Storybook is an open source tool for developing UI components in isolation for React, Vue, and Angular. It makes building stunning UIs organized and efficient.',
			image: 'https://storybook.js.org/images/logos/icon-storybook.png',
			link: configLink.actions,
		},
		{
			id: 'teaser-3',
			type: 'teaser' as 'teaser',
			href: 'http://localhost:6006',
			title: 'Storybook',
			subtitle:
				'Build bulletproof UI components faster. Storybook is an open source tool for developing UI components in isolation for React, Vue, and Angular. It makes building stunning UIs organized and efficient.',
			icon: 'compare',
			link: configLink.actions[0],
		},
	],
};

const props = {
	id: '1',
	name: 'PluginActions',
	lowerCaseName: 'plugin-actions',
	dark: false,
};

describe('PluginTerminal', () => {
	test('exist', () => {
		expect(typeof PluginActions).toBe('object');
	});
	test('links', () => {
		const { container } = render(
			<PluginActions
				{...{
					...props,
					clientConfig: {
						title: 'Links',
						...configLink,
					},
				}}
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});
	test('links in dark mode', () => {
		const { container } = render(
			<PluginActions
				{...{
					...props,
					dark: true,
					clientConfig: {
						title: 'Links',
						...configLink,
					},
				}}
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});
	test('teaser with one link', () => {
		const { container } = render(
			<PluginActions
				{...{
					...props,
					dark: true,
					clientConfig: {
						actions: [configTeaser.actions[0]],
					},
				}}
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});
	test('teaser with multiple links', () => {
		const { container } = render(
			<PluginActions
				{...{
					...props,
					clientConfig: {
						actions: [configTeaser.actions[1]],
					},
				}}
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});
	test('teaser with icon', () => {
		const { container } = render(
			<PluginActions
				{...{
					...props,
					clientConfig: {
						actions: [configTeaser.actions[2]],
					},
				}}
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
