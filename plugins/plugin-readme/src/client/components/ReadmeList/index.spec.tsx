/// <reference types="@types/jest" />
const useFullScreenMock = jest.fn().mockImplementation(() => ({
	fullscreen: false,
	enableFullscreen: jest.fn(),
	disableFullscreen: jest.fn(),
}));
jest.mock('../../hooks', () => ({
	__esModule: true, // this property makes it work
	// default: 'mockedDefaultExport',
	useMarkdownData: jest.fn().mockImplementation(() => '<div>markdown</div>'),
	useFullscreen: useFullScreenMock,
}));

import { render } from '@testing-library/react';
import React from 'react';
import { getMatchingQuery, Readme, ReadmeList } from '.';

describe('PluginReadmeList', () => {
	describe('ReadmeList', () => {
		test('exist', () => {
			expect(typeof ReadmeList).toBe('object');
		});
		test('render default', () => {
			const { container } = render(
				<ReadmeList
					id={'i1-root'}
					name={'PluginReadmeList'}
					lowerCaseName={'plugin-readme-list'}
					clientConfig={{
						files: [
							{
								title: 'title',
								file: '/path-to-file',
								id: 'id',
							},
						],
					}}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});
		test('render fullscreen', () => {
			useFullScreenMock.mockReturnValue({
				fullscreen: true,
				enableFullscreen: jest.fn(),
				disableFullscreen: jest.fn(),
			});
			const { container } = render(
				<ReadmeList
					id={'i1-root'}
					name={'PluginReadmeList'}
					lowerCaseName={'plugin-readme-list'}
					clientConfig={{
						title: 'custom title',
						files: [
							{
								title: 'title',
								file: '/path-to-file',
								id: 'id',
							},
						],
					}}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
			jest.restoreAllMocks();
		});
	});

	describe('Readme', () => {
		test('exist', () => {
			expect(typeof Readme).toBe('object');
		});
	});

	describe('getMatchingQuery', () => {
		test('first one matches', () => {
			expect(
				getMatchingQuery({
					1: true,
					2: false,
					3: false,
					4: false,
					5: false,
					6: false,
				})
			).toBe('1');
		});
		test('last one matches', () => {
			expect(
				getMatchingQuery({
					1: false,
					2: false,
					3: false,
					4: false,
					5: false,
					6: true,
				})
			).toBe('6');
		});
		test('multiple matches sould return first one', () => {
			expect(
				getMatchingQuery({
					1: false,
					2: true,
					3: false,
					4: false,
					5: false,
					6: true,
				})
			).toBe('2');
		});
	});
});
